# Consignação IRS

Webapp para facilitar a descoberta e escolha de instituições elegíveis para consignação de 1% do IRS em Portugal.

## Funcionalidades

- **Área pública**: Pesquisa e filtros por nome, localidade, tipo; listagem; mapa; página de detalhe com botão copiar NIPC
- **Backoffice**: Upload de CSV (lista do Portal das Finanças), gestão de entidades, enriquecimento (descrição, contactos, localização com geocoding Nominatim)

## Setup

### 1. Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. No SQL Editor, execute as migrações em `supabase/migrations/` (001 e 002)
3. Em Authentication > Providers, ative Email e crie um utilizador para o backoffice
4. Copie o Project URL e a Publishable key de Settings > API

### 2. Variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Edite `.env.local` e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...   # ou eyJ... em projetos antigos
```

### 3. Executar

```bash
npm install
npm run dev
```

Aceda a [http://localhost:3000](http://localhost:3000). O backoffice está em `/backoffice` (requer login). Em produção: [https://consigna-irs.vercel.app](https://consigna-irs.vercel.app).

## Upload de dados

O ficheiro CSV do Portal das Finanças tem as colunas: **NIPC**, **Nome**, **Localidade**. O parser converte automaticamente nomes em MAIÚSCULAS para formato legível.

## Stack

- Next.js 14, Tailwind CSS
- Supabase (PostgreSQL, Auth)
- Leaflet + OpenStreetMap (mapa)
- Nominatim (geocoding)
