# Guia de Publicação — Consignação IRS

Este guia explica como publicar a aplicação para acesso via web. A app é estática no frontend e usa Supabase como backend, pelo que não precisas de servidor próprio — basta hospedar o Next.js numa plataforma de hosting.

---

## Opções de hosting recomendadas

| Plataforma | Dificuldade | Custo | Ideal para |
|------------|-------------|-------|------------|
| **Vercel** | ⭐ Fácil | Gratuito | Next.js (recomendado) |
| **Netlify** | ⭐ Fácil | Gratuito | Alternativa ao Vercel |
| **Railway** | ⭐⭐ Média | Pago após trial | Controlo total |
| **Docker + VPS** | ⭐⭐⭐ Avançado | Variável | Self-hosting |

---

## 1. Vercel (recomendado)

A Vercel é feita pela equipa do Next.js e oferece deploy automático a partir do Git.

### Pré-requisitos

- Conta em [vercel.com](https://vercel.com)
- Projeto no Git (GitHub, GitLab ou Bitbucket)

### Passos

#### 1.1. Preparar o repositório

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/teu-user/consigna.git
git push -u origin main
```

#### 1.2. Importar projeto na Vercel

1. Acede a [vercel.com/new](https://vercel.com/new)
2. Clica em **Import Git Repository** e seleciona o repositório
3. Confirma:
   - **Framework Preset**: Next.js (detetado automaticamente)
   - **Root Directory**: `./` (deixar em branco)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)

#### 1.3. Variáveis de ambiente

Na página de importação (ou depois em **Settings** → **Environment Variables**), adiciona:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://teu-projeto.supabase.co` | Production, Preview |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable key (ex: `sb_publishable_...`) | Production, Preview |

⚠️ **Importante**: Usa as mesmas credenciais do Supabase que já configuraste localmente.

#### 1.4. Configurar Supabase para produção

O Supabase precisa de saber que a tua app em produção é um URL válido para redirecionamentos de autenticação.

1. No Supabase, vai a **Authentication** → **URL Configuration**
2. Em **Site URL**, coloca o URL da Vercel (ex: `https://consigna-irs.vercel.app`)
3. Em **Redirect URLs**, adiciona:
   - `https://consigna-irs.vercel.app/**`
   - `https://teu-dominio.pt/**` (se usares domínio customizado)

#### 1.5. Deploy

1. Clica em **Deploy**
2. Aguarda o build (1–3 minutos)
3. A app fica disponível em `https://consigna-irs.vercel.app`

### Domínio customizado (opcional)

1. Na Vercel, vai ao projeto → **Settings** → **Domains**
2. Adiciona o teu domínio (ex: `consigna.pt`)
3. Segue as instruções para configurar DNS (CNAME ou A record)
4. Atualiza as **Redirect URLs** no Supabase com o novo domínio

---

## 2. Netlify

### Passos rápidos

1. Cria conta em [netlify.com](https://netlify.com)
2. **Add new site** → **Import an existing project** → conecta o Git
3. A Netlify deteta Next.js automaticamente e aplica o plugin correto
4. Confirma **Build command**: `npm run build`
5. Adiciona as variáveis de ambiente em **Site settings** → **Environment variables**
6. Configura as **Redirect URLs** no Supabase com o URL da Netlify (ex: `https://teu-site.netlify.app/**`)

---

## 3. Railway

1. Cria conta em [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub repo**
3. Seleciona o repositório
4. Railway deteta Next.js automaticamente
5. Em **Variables**, adiciona `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Atualiza as **Redirect URLs** no Supabase com o URL gerado (ex: `https://teu-projeto.up.railway.app/**`)

---

## 4. Checklist antes de publicar

- [ ] Base de dados Supabase configurada (migração executada)
- [ ] Utilizador de backoffice criado em **Authentication** → **Users**
- [ ] Variáveis de ambiente definidas na plataforma de hosting
- [ ] **Site URL** e **Redirect URLs** configurados no Supabase para o domínio de produção
- [ ] Testar login no backoffice após deploy

---

## 5. Resolução de problemas

### "Invalid redirect URL" ao fazer login

- Confirma que o URL exato da app está em **Redirect URLs** no Supabase (com `/**` no final)
- Inclui `http://` ou `https://` conforme o caso

### Erro 500 ou página em branco

- Verifica os logs de build na plataforma (Vercel, Netlify, etc.)
- Confirma que as variáveis `NEXT_PUBLIC_*` estão definidas (são injetadas em build time)

### Supabase "Failed to fetch"

- Projeto Supabase pode estar pausado (plano gratuito) — restaura no dashboard
- Confirma que `NEXT_PUBLIC_SUPABASE_URL` não tem barra final

---

## 6. Segurança

- **Nunca** faças commit de `.env.local` — usa `.gitignore` (já deve estar incluído)
- A Publishable key do Supabase é pública por design; a segurança vem das políticas RLS na base de dados
- Para produção séria, considera domínio customizado e HTTPS (a Vercel/Netlify já fornecem HTTPS por defeito)
