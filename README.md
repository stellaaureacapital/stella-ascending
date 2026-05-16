# Stella Aurea Capital

Aplicação React + Vite + TypeScript + Tailwind, com backend gerenciado (Lovable Cloud / Supabase).

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy na Vercel

1. Faça push do repositório no GitHub.
2. Em https://vercel.com/new, importe o repositório.
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. O arquivo `vercel.json` já configura o rewrite para SPA (React Router).
5. Adicione as variáveis de ambiente do Supabase em **Project Settings → Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`

   Os valores estão no arquivo `.env` local (gerenciado pelo Lovable Cloud).

## Backend

O banco de dados, autenticação e funções serverless rodam no **Lovable Cloud** (Supabase gerenciado). Nenhuma configuração externa adicional é necessária além de copiar as variáveis acima para a Vercel.