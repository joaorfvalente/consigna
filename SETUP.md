# Guia de Configuração — Consignação IRS

Este guia ajuda-te a configurar e testar a aplicação do zero.

---

## Checklist de configuração

- [ ] **1. Projeto Supabase** — criar e obter credenciais
- [ ] **2. Variáveis de ambiente** — preencher `.env.local`
- [ ] **3. Base de dados** — executar migração SQL
- [ ] **4. Autenticação** — criar utilizador para o backoffice
- [ ] **5. Testar** — correr a app e verificar fluxos

---

## 1. Criar projeto Supabase

1. Acede a [supabase.com](https://supabase.com) e faz login
2. Clica em **New Project**
3. Escolhe organização, nome do projeto e password da base de dados
4. Aguarda a criação do projeto

---

## 2. Obter credenciais e configurar `.env.local`

1. No dashboard do Supabase, vai a **Settings** → **API**
2. Copia:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **Publishable** key (em Project API keys; em projetos antigos pode aparecer como "anon public")

3. Abre o ficheiro `.env.local` na raiz do projeto e substitui:

```
NEXT_PUBLIC_SUPABASE_URL=https://teu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...   # ou eyJ... em projetos antigos
```

---

## 3. Executar migração da base de dados

1. No Supabase, vai a **SQL Editor**
2. Clica em **New query**
3. Copia todo o conteúdo de `supabase/migrations/001_create_entities.sql`
4. Cola no editor e clica em **Run**
5. Repete para `supabase/migrations/002_add_original_fields.sql` (campos originais NIPC, Nome, Localidade)

Deve aparecer uma mensagem de sucesso. As tabelas `entities` e `imports` ficam criadas com RLS ativado.

---

## 4. Criar utilizador para o backoffice

1. No Supabase, vai a **Authentication** → **Providers**
2. Confirma que **Email** está ativo
3. Vai a **Authentication** → **Users**
4. Clica em **Add user** → **Create new user**
5. Introduz email e password (guarda para login no backoffice)
6. Opcional: desativa "Auto Confirm User" se quiseres confirmar manualmente

---

## 5. Testar a aplicação

```bash
npm run dev
```

Acede a [http://localhost:3000](http://localhost:3000).

### O que testar

| Rota | O que verificar |
|------|-----------------|
| `/` | Página inicial com links para entidades e mapa |
| `/entidades` | Lista de instituições (vazia se ainda não houver dados) |
| `/entidades/mapa` | Mapa (vazio ou com marcadores se houver dados) |
| `/backoffice` | Redireciona para login |
| `/backoffice/login` | Formulário de login com o email/password criados |
| `/backoffice/upload` | Upload de CSV (após login) |
| `/backoffice/entidades` | Gestão de entidades (após login) |

### Dados de teste

Para ter dados na app:

1. Faz login no backoffice
2. Vai a **Upload**
3. Faz upload de um CSV do Portal das Finanças com colunas: NIPC, Nome, Localidade
4. Ou insere manualmente entidades na tabela `entities` via **Table Editor** no Supabase

---

## Resolução de problemas

### "Missing Supabase environment variables"
- Confirma que `.env.local` existe e tem `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Reinicia o servidor (`npm run dev`)

### Erro ao executar migração
- Se aparecer erro com `EXECUTE FUNCTION`, tenta substituir por `EXECUTE PROCEDURE` na linha do trigger
- Confirma que não tens já tabelas `entities` ou `imports` com nomes em conflito

### "Failed to fetch" ao fazer login
- **Projeto pausado**: Projetos Supabase gratuitos pausam após ~7 dias de inatividade. Vai ao [dashboard](https://supabase.com/dashboard), escolhe o projeto e clica em **Restore**.
- **Reiniciar servidor**: Após alterar `.env.local`, executa `npm run dev` de novo.
- **Extensões do browser**: Testa em modo anónimo ou desativa bloqueadores de anúncios/privacy.
- **URL correta**: Confirma que `NEXT_PUBLIC_SUPABASE_URL` em `.env.local` está correto e sem barra final.

### Login não funciona
- Verifica em **Authentication** → **Users** se o utilizador existe e está confirmado
- Confirma que o provider Email está ativo em **Authentication** → **Providers**

### Página em branco ou erro 500
- Abre a consola do browser (F12) e a tab Network para ver erros
- Verifica os logs do terminal onde corre `npm run dev`
