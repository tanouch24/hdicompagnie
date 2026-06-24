const { Pool } = require("pg");
const nodemailer = require("nodemailer");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

function buildLeadEmail(table, data) {
  const title = table === "pac_leads"
    ? "Nouveau lead Pompe à chaleur"
    : "Nouvelle demande contact HDI";

  const fields = Object.entries(data)
    .filter(([key]) => key !== "table")
    .map(([key, value]) => `${key}: ${value || ""}`)
    .join("\n");

  return {
    subject: `${title} - ${data.nom || "Sans nom"}`,
    text: `${title}\n\n${fields}`,
  };
}

async function sendLeadEmail(table, data) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.LEAD_NOTIFY_EMAIL) {
    console.warn("Email non envoyé: SMTP_USER / SMTP_PASS / LEAD_NOTIFY_EMAIL manquant");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const email = buildLeadEmail(table, data);

  await transporter.sendMail({
    from: `"HDI Leads" <${process.env.SMTP_USER}>`,
    to: process.env.LEAD_NOTIFY_EMAIL,
    subject: email.subject,
    text: email.text,
  });

  return true;
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Méthode non autorisée" });
  }

  if (!process.env.DATABASE_URL) {
    return json(500, { error: "DATABASE_URL manquante côté Netlify" });
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const table = data.table;

    if (table === "contact_requests") {
      await pool.query(
        `
        insert into contact_requests (
          nom,
          telephone,
          email,
          code_postal,
          client,
          projet,
          message,
          consentement,
          source
        )
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `,
        [
          data.nom || null,
          data.telephone || null,
          data.email || null,
          data.code_postal || null,
          data.client || null,
          data.projet || null,
          data.message || null,
          Boolean(data.consentement),
          data.source || "site_hdi_contact",
        ]
      );

      const emailSent = await sendLeadEmail(table, data).catch((error) => {
        console.error("Erreur email:", error.message);
        return false;
      });

      return json(200, { ok: true, emailSent });
    }

    if (table === "pac_leads") {
      await pool.query(
        `
        insert into pac_leads (
          nom,
          telephone,
          email,
          ville,
          logement_type,
          chauffage_actuel,
          statut_occupation,
          consentement,
          source
        )
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `,
        [
          data.nom,
          data.telephone,
          data.email,
          data.ville,
          data.logement_type,
          data.chauffage_actuel,
          data.statut_occupation,
          Boolean(data.consentement),
          data.source || "aides-pompe-a-chaleur",
        ]
      );

      const emailSent = await sendLeadEmail(table, data).catch((error) => {
        console.error("Erreur email:", error.message);
        return false;
      });

      return json(200, { ok: true, emailSent });
    }

    return json(400, { error: "Table inconnue" });
  } catch (error) {
    console.error("Erreur lead:", error);
    return json(500, { error: "Impossible d'enregistrer le lead" });
  }
};
