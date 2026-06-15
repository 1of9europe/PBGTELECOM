# PBG TELECOM — Plateforme SaaS SAV & Maintenance

Plateforme B2B pour **PBG TELECOM** : gestion clients, sites, équipements télécom/sécurité, tickets SAV, interventions terrain, contrats de maintenance et abonnements.

**Dépôt GitHub :** [https://github.com/1of9europe/PBGTELECOM](https://github.com/1of9europe/PBGTELECOM)

## Stack

- **Next.js 15** (App Router, TypeScript strict)
- **Tailwind CSS 4** + **Shadcn UI**
- **Prisma** + **SQLite** (dev local) / **PostgreSQL** (production)
- **Auth.js (NextAuth v5)** — authentification credentials + RBAC
- **Zod** — validation des formulaires
- **TanStack Table** — tableaux de données

## Prérequis

- Node.js 20+
- **Dev local :** rien d'autre (SQLite embarqué)
- **Production :** Docker ou PostgreSQL managé (Neon, Supabase, etc.)

## Installation

```bash
# 1. Cloner le dépôt et installer les dépendances
git clone https://github.com/1of9europe/PBGTELECOM.git
cd PBGTELECOM
npm install

# 2. Configurer l'environnement
cp .env.example .env

# 3. Créer la base SQLite et charger les données de démo
npm run setup

# 4. Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000/login](http://localhost:3000/login)

### PostgreSQL (optionnel — production ou Docker)

Si vous préférez PostgreSQL en local :

1. Dans `prisma/schema.prisma`, remplacez `provider = "sqlite"` par `provider = "postgresql"`
2. Dans `.env`, utilisez : `DATABASE_URL="postgresql://pbg:pbg_secret@localhost:5432/pbgtelecom?schema=public"`
3. Lancez `docker compose up -d`, puis `npm run db:migrate && npm run db:seed`

<details>
<summary>Ancienne procédure Docker-only (archivée)</summary>

```bash
# 3. Démarrer PostgreSQL (Docker)
docker compose up -d

# 4. Appliquer le schéma et seed
npm run db:migrate
npm run db:seed

# 5. Lancer le serveur de développement
npm run dev
```

</details>

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL PostgreSQL (`postgresql://pbg:pbg_secret@localhost:5432/pbgtelecom`) |
| `AUTH_SECRET` | Secret Auth.js — générer avec `openssl rand -base64 32` |
| `AUTH_URL` | URL de l'app (`http://localhost:3000`) |
| `STRIPE_SECRET_KEY` | (Futur) Clé secrète Stripe |
| `STRIPE_WEBHOOK_SECRET` | (Futur) Webhook Stripe |

## Commandes Prisma

```bash
npm run db:generate   # Générer le client Prisma
npm run db:migrate    # Créer/appliquer les migrations
npm run db:push       # Push schema sans migration (dev rapide)
npm run db:seed       # Peupler avec des données de démo
npm run db:studio     # Interface Prisma Studio
npm run db:reset      # Reset DB + seed
```

## Comptes de test

Mot de passe pour tous : **`Password123!`**

| Rôle | Email |
|------|-------|
| Super Admin | `admin@pbgtelecom.fr` |
| Admin | `sophie@pbgtelecom.fr` |
| Technicien | `karim@pbgtelecom.fr` |
| Technicien | `thomas@pbgtelecom.fr` |
| Client (Syndic) | `client@oliviers-syndic.fr` |
| Client (Commerce) | `client@boulangerie-martin.fr` |

## Rôles & permissions

| Rôle | Accès |
|------|-------|
| **SUPER_ADMIN** | Espace admin (`/admin` + `/dashboard`) |
| **ADMIN** | Espace admin (`/admin` + `/dashboard`) |
| **TECHNICIAN** | Espace opérationnel (`/dashboard`) |
| **CUSTOMER** | Portail client uniquement (`/client`) |

## Portails applicatifs

- **Portail admin** : `/admin/dashboard` (alias sécurisé vers l'espace admin existant), routes historiques conservées sous `/dashboard`
- **Portail client** : `/client/dashboard`
- **Redirection post-login par rôle** :
  - `CUSTOMER` -> `/client/dashboard`
  - `ADMIN` / `SUPER_ADMIN` -> `/admin/dashboard`
  - `TECHNICIAN` -> `/dashboard`

### Routes portail client

- `/client/dashboard`
- `/client/requests`
- `/client/equipments`
- `/client/interventions`
- `/client/documents`
- `/client/project-info`
- `/client/profile`

## Architecture

```
src/
├── app/
│   ├── api/auth/          # Routes Auth.js
│   ├── dashboard/         # Espace opérationnel/admin historique (conservé)
│   ├── admin/             # Entrée admin sécurisée
│   ├── client/            # Portail client dédié
│   └── login/
├── components/
│   ├── layout/            # AppSidebar
│   ├── client/            # UI dédiée portail client
│   ├── dashboard/         # DashboardCard
│   ├── shared/            # DataTable, StatusBadge, PageHeader
│   └── [entity]/          # Tables & formulaires par entité
├── lib/
│   ├── actions/           # Server Actions CRUD
│   ├── auth.ts            # Config Auth.js
│   ├── filters.ts         # Multi-tenant & formatage
│   ├── permissions.ts     # RBAC helpers
│   └── validations/       # Schémas Zod
├── prisma/                # Schéma + seed
└── types/
```

## Fonctionnalités MVP

- Dashboard KPIs (clients, tickets, interventions, contrats, MRR)
- CRUD complet : clients, sites, équipements, tickets, interventions, contrats, abonnements
- Sidebar responsive (desktop + mobile sheet)
- Thème sombre/clair (bleu électrique PBG)
- Badges de statut, empty states, toasts
- Multi-tenant simple via `customerId` sur l'utilisateur CUSTOMER

## Prochaines évolutions

1. **Monitoring caméra/NVR** — ping IP, alertes offline, dashboard temps réel
2. **Intégration Stripe** — facturation abonnements, webhooks, portail client
3. **Notifications** — email/SMS sur tickets urgents et interventions
4. **App mobile technicien** — PWA offline, signature client, photos
5. **Rapports PDF** — comptes-rendus d'intervention exportables
6. **API REST** — intégration ERP/comptabilité
7. **Audit log** — traçabilité des modifications

## Dépôt Git

| Commande | Description |
|----------|-------------|
| `git clone https://github.com/1of9europe/PBGTELECOM.git` | Cloner le projet |
| `git remote -v` | Vérifier le remote `origin` |
| `git pull origin main` | Récupérer les dernières modifications |

Remote configuré :

```text
origin  https://github.com/1of9europe/PBGTELECOM.git
```

## Licence

Propriétaire — PBG TELECOM © 2024
