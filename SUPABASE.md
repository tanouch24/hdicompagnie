# Supabase - formulaire de contact

Le formulaire `contact.html` envoie les demandes vers Supabase via l'API REST.

## Projet

- URL : `https://qxbxfmmsdmdrqyidotli.supabase.co`
- Table utilisée : `contact_requests`

## SQL à exécuter dans Supabase

```sql
create table if not exists public.contact_requests (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),

  nom text,
  telephone text,
  email text,
  code_postal text,

  client text,
  projet text,
  message text,

  consentement boolean default false,

  source text default 'landing_ads'
);

alter table public.contact_requests enable row level security;

create policy "Public contact form insert"
on public.contact_requests
for insert
to anon
with check (true);
```

## Champs envoyés

- `nom`
- `telephone`
- `email`
- `code_postal`
- `client`
- `projet`
- `message`
- `consentement`
- `source`
