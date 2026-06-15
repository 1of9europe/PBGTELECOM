# Guide de déploiement — PBG TELECOM sur Cloudflare Workers

Ce guide explique comment déployer le site vitrine + espace client (SaaS) sur **Cloudflare Workers** avec **PostgreSQL** (Prisma).

> **Note importante :** le projet utilise désormais **PostgreSQL** (plus SQLite).  
> Votre ancien fichier `prisma/dev.db` local n'est plus utilisé. Vous pouvez le supprimer.

---

## Prérequis

- Un compte [Cloudflare](https://dash.cloudflare.com) (gratuit)
- Node.js 20+ installé en local
- Le domaine `pbgtelecom.fr` configuré sur Cloudflare (optionnel au début — Wrangler fournit une URL `*.workers.dev`)

---

## 1. Créer une base PostgreSQL gratuite

### Option recommandée : Prisma Postgres Free

1. Allez sur [console.prisma.io](https://console.prisma.io)
2. Créez un compte (gratuit)
3. Créez un projet → **Create database**
4. Choisissez la région la plus proche (ex. `eu-west`)
5. Copiez la **Connection string** (format `postgresql://...`)

### Alternative : Neon Free

1. Allez sur [neon.tech](https://neon.tech)
2. Créez un projet gratuit
3. Copiez la connection string PostgreSQL depuis le dashboard

Les deux options sont compatibles avec Prisma et Cloudflare Workers (via `nodejs_compat`).

---

## 2. Récupérer la `DATABASE_URL`

La variable ressemble à :

```
postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public
```

- **Prisma Postgres** : Dashboard → votre base → **Connect** → copier l'URL
- **Neon** : Dashboard → **Connection details** → copier l'URL

Conservez cette URL en lieu sûr — ne la commitez jamais dans Git.

---

## 3. Générer `AUTH_SECRET`

Dans un terminal :

```bash
openssl rand -base64 32
```

Copiez le résultat — ce sera votre clé secrète Auth.js.

---

## 4. Configurer les variables d'environnement

### En local (développement)

Copiez `.env.example` vers `.env` et remplissez :

```bash
cp .env.example .env
```

Exemple pour le local (vous pouvez utiliser la même base Neon/Prisma Postgres ou une branche dev) :

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
AUTH_SECRET="votre-clé-générée"
AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

### En production (Cloudflare)

Dans le [dashboard Cloudflare](https://dash.cloudflare.com) → **Workers & Pages** → votre worker `pbgtelecom` → **Settings** → **Variables and Secrets** :

| Variable | Valeur | Type |
|----------|--------|------|
| `DATABASE_URL` | `postgresql://...` | **Secret** |
| `AUTH_SECRET` | clé générée avec openssl | **Secret** |
| `AUTH_URL` | `https://pbgtelecom.fr` | Variable |
| `NEXT_PUBLIC_SITE_URL` | `https://pbgtelecom.fr` | Variable |
| `STRIPE_SECRET_KEY` | (vide ou clé Stripe) | Secret |
| `STRIPE_WEBHOOK_SECRET` | (vide ou secret webhook) | Secret |

> **Build CI :** si vous déployez via GitHub, ajoutez aussi `DATABASE_URL` dans les **Build environment variables** du projet Cloudflare. Cela évite l'erreur `Missing required environment variable: DATABASE_URL` pendant `prisma generate` au build.

---

## 5. Secrets Wrangler (déploiement CLI)

Si vous déployez avec `npm run deploy` :

```bash
npx wrangler login
npx wrangler secret put DATABASE_URL
npx wrangler secret put AUTH_SECRET
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
```

Wrangler vous demandera la valeur de chaque secret interactivement.

Pour le preview local Workers :

```bash
cp .dev.vars.example .dev.vars
# Éditez .dev.vars et ajoutez vos secrets (DATABASE_URL, AUTH_SECRET, etc.)
```

---

## 6. Commandes base de données

### Générer le client Prisma

```bash
npx prisma generate
```

> Exécuté automatiquement via `postinstall` après `npm install`.

### Créer une migration (local, première fois)

```bash
npx prisma migrate dev --name init
```

### Peupler la base avec des données de démo

```bash
npm run db:seed
```

Comptes de test créés par le seed :

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| `admin@pbgtelecom.fr` | `Password123!` | SUPER_ADMIN |
| `tech@pbgtelecom.fr` | `Password123!` | TECHNICIAN |
| `client@oliviers-syndic.fr` | `Password123!` | CUSTOMER |

### Appliquer les migrations en production

```bash
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

Ou depuis votre machine si `.env` pointe déjà vers la base de production.

---

## 7. Développement local

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init   # première fois seulement
npm run db:seed                       # optionnel — données de démo
npm run dev                           # http://localhost:3000
```

### Preview Workers (runtime identique à la production)

```bash
npm run preview
```

---

## 8. Build et déploiement

### Build Next.js seul (vérification)

```bash
npm run build
```

### Déployer sur Cloudflare Workers

```bash
npm run deploy
```

Étapes exécutées :

1. `opennextjs-cloudflare build` — compile Next.js pour Workers
2. `opennextjs-cloudflare deploy` — envoie sur Cloudflare

### Déploiement automatique (Git)

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Connect to Git**
2. Sélectionnez le repo GitHub/GitLab
3. Build command : `npm run deploy` ou `opennextjs-cloudflare build && opennextjs-cloudflare deploy`
4. Ajoutez les variables d'environnement (section 4)

---

## 9. Vérifications après déploiement

| URL / action | Attendu |
|--------------|---------|
| `https://pbgtelecom.fr` | Page d'accueil vitrine |
| `/services`, `/contact`, `/a-propos` | Pages marketing OK |
| `/login` | Formulaire de connexion |
| `/dashboard` | Espace admin (après login admin) |
| `/client/dashboard` | Espace client (après login customer) |
| Bouton « Espace client » | Redirige vers `/login` ou dashboard |
| Formulaire de contact | Fonctionne sans erreur DB |
| Logs Cloudflare | Pas d'erreur `DATABASE_URL` ni Prisma |

---

## 10. Dépannage

### `Missing required environment variable: DATABASE_URL`

- Vérifiez que `DATABASE_URL` est définie dans Cloudflare (secrets **et** variables de build CI)
- En local : vérifiez votre fichier `.env`

### Erreur Prisma / connexion refusée

- Vérifiez que l'URL PostgreSQL est correcte
- Prisma Postgres / Neon : autorisez les connexions externes si demandé
- Appliquez les migrations : `npx prisma migrate deploy`

### Auth ne fonctionne pas en production

- `AUTH_SECRET` doit être identique entre déploiements
- `AUTH_URL` doit être `https://pbgtelecom.fr` (sans slash final)
- Vérifiez que le domaine custom est bien lié au worker Cloudflare

### Build OpenNext échoue

- Vérifiez `nodejs_compat` dans `wrangler.jsonc`
- Vérifiez que `@prisma/client` est dans `serverExternalPackages` (`next.config.ts`)

---

## Architecture résumée

```
Navigateur
    ↓
Cloudflare Workers (OpenNext)
    ↓
Next.js App Router
    ├── Site vitrine (/, /services, /contact…)
    ├── Auth.js (JWT) — /login, /api/auth/*
    ├── Dashboard admin — /dashboard/*
    └── Espace client — /client/*
    ↓
PostgreSQL (Prisma Postgres ou Neon)
```

---

## Fichiers de configuration clés

| Fichier | Rôle |
|---------|------|
| `wrangler.jsonc` | Config Cloudflare Workers |
| `open-next.config.ts` | Adaptateur OpenNext |
| `next.config.ts` | Next.js + Prisma externals |
| `prisma/schema.prisma` | Schéma PostgreSQL |
| `.env.example` | Modèle des variables (sans secrets) |
| `.env` | Variables locales (**non versionné**) |
