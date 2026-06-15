export const CLIENT_PORTAL_URL = "/login";

export const company = {
  name: "PBG TELECOM",
  tagline: "Votre sécurité, notre terrain depuis 2004",
  slogan: "Sécurisez sans compromis",
  founded: 2004,
  phone: "07 69 68 62 65",
  phoneHref: "tel:+33769686265",
  email: "pbgtelecom@gmail.com",
  emailHref: "mailto:pbgtelecom@gmail.com",
  address: "2 bis Avenue Henry Barbusse",
  zones: "Île-de-France, PACA — intervention possible partout en France selon projet",
  footerTagline:
    "Vidéoprotection, réseaux & contrôle d'accès pro, fiables et sur mesure.",
} as const;

export const seo = {
  title: "PBG TELECOM | Vidéosurveillance, alarmes, contrôle d'accès et réseaux",
  description:
    "PBG TELECOM accompagne entreprises, syndics, commerces, bailleurs et particuliers depuis 2004 dans l'installation, la maintenance et le dépannage de systèmes de vidéosurveillance, alarmes, contrôle d'accès, interphonie et réseaux courants faibles.",
  keywords: [
    "vidéosurveillance",
    "alarme intrusion",
    "alarme incendie",
    "contrôle d'accès",
    "interphonie",
    "réseaux informatiques",
    "courants faibles",
    "maintenance sécurité",
    "installation caméra",
    "syndic immeuble",
    "sécurité commerce",
    "PBG TELECOM",
    "Île-de-France",
    "PACA",
  ],
} as const;

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Secteurs", href: "/#secteurs" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/#contact" },
] as const;

export const footerLinks = [
  { label: "Services", href: "/#services" },
  { label: "Secteurs", href: "/#secteurs" },
  { label: "Contact", href: "/#contact" },
  { label: "Espace client", href: CLIENT_PORTAL_URL },
] as const;

export const hero = {
  title: "Sécurisez vos bâtiments avec un expert terrain depuis 2004",
  subtitle:
    "PBG TELECOM accompagne entreprises, commerces, syndics, bailleurs et particuliers dans l'installation, la maintenance et le suivi de solutions de vidéosurveillance, alarmes, contrôle d'accès, interphonie et réseaux courants faibles.",
  ctaPrimary: "Demander un audit gratuit",
  ctaSecondary: "Découvrir nos services",
} as const;

export const stats = [
  { value: "2004", label: "Expertise depuis" },
  { value: "+20 ans", label: "D'expérience terrain" },
  { value: "Pro & particuliers", label: "Tous types de clients" },
  { value: "IDF & PACA", label: "Zones d'intervention" },
  { value: "360°", label: "Installation, maintenance, dépannage" },
] as const;

export const services = [
  {
    id: "videosurveillance",
    title: "Vidéosurveillance",
    description:
      "Installation de caméras adaptées aux commerces, immeubles, entrepôts, parkings et habitations. Accès à distance possible selon configuration.",
    image: "/images/videosurveillance-placeholder.svg",
  },
  {
    id: "alarmes-intrusion",
    title: "Alarmes intrusion",
    description:
      "Protection des locaux contre les intrusions avec des systèmes fiables, évolutifs et adaptés au niveau de risque.",
  },
  {
    id: "alarme-incendie",
    title: "Alarme incendie",
    description:
      "Installation et maintenance de solutions de sécurité incendie pour locaux professionnels et bâtiments collectifs.",
  },
  {
    id: "controle-acces",
    title: "Contrôle d'accès",
    description:
      "Badges, digicodes, interphones, accès sécurisés pour immeubles, bureaux et sites sensibles.",
    image: "/images/controle-acces-placeholder.svg",
  },
  {
    id: "reseaux",
    title: "Réseaux & courants faibles",
    description:
      "Câblage, baie informatique, prises réseau, infrastructure télécom, déplacement de prises et installation d'éclairage.",
    image: "/images/reseaux-placeholder.svg",
  },
  {
    id: "maintenance",
    title: "Maintenance & dépannage",
    description:
      "Suivi technique, intervention rapide, diagnostic et remise en service des installations existantes.",
    image: "/images/maintenance-placeholder.svg",
  },
] as const;

export const whyChooseUs = [
  "Expertise terrain depuis 2004",
  "Solutions sur mesure",
  "Accompagnement de l'étude à l'installation",
  "Maintenance et suivi long terme",
  "Intervention rapide",
  "Expérience grands comptes, bailleurs, commerces et particuliers",
] as const;

export const sectors = [
  {
    title: "Syndics & immeubles",
    description: "Vidéosurveillance, interphonie et contrôle d'accès pour copropriétés.",
  },
  {
    title: "Bailleurs sociaux / OPHLM",
    description: "Sécurisation des halls, parkings et espaces communs.",
  },
  {
    title: "Commerces de proximité",
    description: "Protection adaptée aux flux clients et aux horaires d'ouverture.",
  },
  {
    title: "Pharmacies, tabacs, boulangeries…",
    description: "Alarmes, caméras et contrôle d'accès pour commerces sensibles.",
  },
  {
    title: "Entrepôts & locaux professionnels",
    description: "Surveillance périmétrique et gestion des accès site.",
  },
  {
    title: "Particuliers",
    description: "Alarmes, vidéosurveillance et interphonie pour habitations.",
  },
] as const;

export const saasSection = {
  title: "Un espace client pour suivre vos installations et vos demandes",
  description:
    "Le module compte client PBG TELECOM permet de centraliser les informations liées aux interventions, équipements, demandes et suivis. Il sera progressivement intégré pour faciliter la gestion entre PBG TELECOM et ses clients.",
  features: [
    "Accès sécurisé client",
    "Suivi des demandes",
    "Historique des interventions",
    "Centralisation des équipements",
    "Communication simplifiée",
    "Documents et informations projet",
  ],
  cta: "Accéder à mon espace client",
} as const;

export const processSteps = [
  { step: "01", title: "Audit gratuit", description: "Analyse de vos locaux et de vos enjeux de sécurité." },
  { step: "02", title: "Étude du besoin", description: "Définition du niveau de risque et des contraintes terrain." },
  { step: "03", title: "Proposition technique", description: "Devis détaillé avec solutions adaptées et évolutives." },
  { step: "04", title: "Installation", description: "Pose professionnelle, câblage propre et configuration." },
  { step: "05", title: "Mise en service", description: "Tests, formation utilisateur et remise de documentation." },
  { step: "06", title: "Maintenance & suivi", description: "Interventions, dépannage et suivi dans la durée." },
] as const;

export const realizations = [
  {
    title: "Sécurisation d'immeubles collectifs",
    description: "Interphonie, contrôle d'accès et vidéosurveillance des parties communes.",
  },
  {
    title: "Installation de caméras pour commerces",
    description: "Couverture des zones sensibles avec accès distant selon configuration.",
  },
  {
    title: "Contrôle d'accès pour bureaux",
    description: "Gestion des badges et horaires pour sites professionnels.",
  },
  {
    title: "Maintenance de systèmes existants",
    description: "Reprise, diagnostic et remise en service d'installations en place.",
  },
] as const;

export const faq = [
  {
    question: "Intervenez-vous pour les particuliers ?",
    answer:
      "Oui. PBG TELECOM intervient auprès des particuliers pour la vidéosurveillance, les alarmes, l'interphonie et le contrôle d'accès résidentiel.",
  },
  {
    question: "Faites-vous les syndics d'immeuble ?",
    answer:
      "Oui. Nous accompagnons les syndics et gestionnaires de copropriété pour sécuriser halls, parkings, accès et espaces communs.",
  },
  {
    question: "Proposez-vous un devis gratuit ?",
    answer:
      "Oui. Un audit gratuit permet d'évaluer vos besoins et de vous proposer une solution adaptée avec devis détaillé.",
  },
  {
    question: "Intervenez-vous en urgence ?",
    answer:
      "Oui, selon disponibilité. Nous assurons le dépannage et la remise en service rapide de vos systèmes de sécurité.",
  },
  {
    question: "Pouvez-vous reprendre une installation existante ?",
    answer:
      "Oui. Nous diagnostiquons, maintenons et faisons évoluer les installations déjà en place, quelle que soit la marque.",
  },
  {
    question: "Installez-vous aussi les réseaux informatiques ?",
    answer:
      "Oui. Câblage, baies réseau, prises RJ45, infrastructure télécom et courants faibles font partie de nos prestations.",
  },
  {
    question: "L'espace client est-il inclus pour les clients PBG TELECOM ?",
    answer:
      "Le module espace client est en cours de déploiement progressif pour centraliser interventions, équipements et demandes.",
  },
] as const;

export const contactNeedTypes = [
  "Vidéosurveillance",
  "Alarme intrusion",
  "Alarme incendie",
  "Contrôle d'accès",
  "Interphonie",
  "Réseaux & courants faibles",
  "Maintenance / dépannage",
  "Audit gratuit",
  "Autre",
] as const;

export const aboutContent = {
  title: "Expert en systèmes de sécurité depuis 2004",
  paragraphs: [
    "PBG TELECOM est une société spécialisée dans les solutions de sécurité, vidéosurveillance, alarmes, contrôle d'accès, interphonie, réseaux informatiques et courants faibles.",
    "Depuis 2004, nous accompagnons entreprises, commerces, bailleurs sociaux, collectivités, syndics d'immeuble, entrepôts, magasins et particuliers avec une approche terrain, réactive et sur mesure.",
    "Notre engagement : des installations durables, un suivi long terme et un accompagnement de l'audit à la maintenance.",
  ],
  values: [
    { title: "Fiabilité", description: "Des systèmes éprouvés et une installation soignée." },
    { title: "Réactivité", description: "Intervention rapide en dépannage et maintenance." },
    { title: "Accompagnement", description: "De l'étude technique à la mise en service." },
    { title: "Sur mesure", description: "Solutions adaptées à chaque site et chaque risque." },
  ],
} as const;
