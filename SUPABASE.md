# Supabase - formulaire de contact

Le formulaire `contact.html` envoie les demandes vers Supabase via l'API REST.

## Projet

- URL : `https://qxbxfmmsdmdrqyidotli.supabase.co`
- Table utilisée : `contact_requests`

## SQL à exécuter dans Supabase

```sql
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nom text,
  telephone text,
  email text,
  client text,
  projet text,
  message text,
  source text
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
- `client`
- `projet`
- `message`
- `source`
