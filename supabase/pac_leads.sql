-- ============================================================
-- Table : public.pac_leads
-- Projet : HDI Compagnie — Landing PAC particuliers
-- URL landing : https://hdi-cie.fr/aides-pompe-a-chaleur
-- Supabase project : qxbxfmmsdmdrqyidotli
-- ============================================================

create table if not exists public.pac_leads (
  id               uuid        primary key default gen_random_uuid(),
  created_at       timestamptz not null    default now(),
  nom              text        not null,
  telephone        text        not null,
  email            text        not null,
  ville            text        not null,
  logement_type    text        not null,
  chauffage_actuel text        not null,
  statut_occupation text       not null,
  consentement     boolean     not null    default false,
  source           text        not null    default 'aides-pompe-a-chaleur',

  constraint pac_leads_nom_length
    check (char_length(trim(nom)) >= 2),

  constraint pac_leads_telephone_length
    check (char_length(trim(telephone)) between 8 and 24),

  constraint pac_leads_email_format
    check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),

  constraint pac_leads_ville_length
    check (char_length(trim(ville)) >= 2),

  constraint pac_leads_logement_type_allowed
    check (logement_type in (
      'Maison individuelle',
      'Appartement'
    )),

  constraint pac_leads_chauffage_actuel_allowed
    check (chauffage_actuel in (
      'Fioul',
      'Gaz',
      'Électrique ancien',
      'Bois',
      'Autre chauffage'
    )),

  constraint pac_leads_statut_occupation_allowed
    check (statut_occupation in (
      'Propriétaire occupant',
      'Propriétaire bailleur',
      'Locataire'
    )),

  constraint pac_leads_consentement_required
    check (consentement = true)
);

-- Row Level Security
alter table public.pac_leads enable row level security;

-- Aucune lecture publique
create policy "pac_leads_no_public_read"
  on public.pac_leads
  for select
  using (false);

-- L'anon peut insérer (formulaire frontend sans SERVICE_ROLE)
create policy "pac_leads_anon_insert"
  on public.pac_leads
  for insert
  to anon
  with check (true);
