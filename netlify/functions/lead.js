const { Pool } = require("pg");

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

      return json(200, { ok: true });
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

      return json(200, { ok: true });
    }

    return json(400, { error: "Table inconnue" });
  } catch (error) {
    console.error("Erreur lead:", error);
    return json(500, { error: "Impossible d'enregistrer le lead" });
  }
};
