# Oficina Conexão

Aplicação de demonstração em React + Vite para testar a gravação de um nome no Supabase.

## Tecnologias

- React 19.3.1
- Vite 8.3.5
- Supabase JS 2.119.0
- Vercel (hospedagem)

## Requisitos

Node.js 22.12 ou superior.

## Executar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Preencha o arquivo `.env.local` com a URL do projeto Supabase e a chave publishable (ou anon legada):

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICAVEL
```

## Banco de dados

No SQL Editor do Supabase, execute o conteúdo de `supabase/migrations/202611040001_create_nomes.sql`.

A migration cria a tabela `public.nomes` e habilita RLS. A política permite somente INSERT para o papel `anon`; não concede leitura, atualização ou exclusão.

## Deploy na Vercel

Importe o repositório `luizfelipe22dev/app_oficina_conexao` na Vercel e configure as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nos ambientes necessários. O comando de build é `npm run build` e a pasta de saída é `dist`.

> Nunca coloque a chave `service_role` no frontend. Use somente a chave publicável/anon com políticas RLS adequadas.
