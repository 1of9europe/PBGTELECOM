export const CLIENT_PORTAL_URL = "/login";

export const company = {
  name: "PBG TELECOM",
  tagline: "Expert sécurité & courants faibles depuis 2004",
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
  title: "PBG TELECOM | Vidéoprotection, alarmes, contrôle d'accès et réseaux",
  description:
    "PBG TELECOM accompagne entreprises, syndics, commerces, bailleurs et particuliers depuis 2004 dans l'installation, la maintenance et le dépannage de systèmes de vidéoprotection, alarmes, contrôle d'accès, interphonie et réseaux courants faibles.",
  keywords: [
    "vidéoprotection",
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
  { label: "Services", href: "/#services" },
  { label: "Secteurs", href: "/#secteurs" },
  { label: "Méthode", href: "/#methode" },
  { label: "Espace client", href: "/#espace-client" },
  { label: "Contact", href: "/#contact" },
] as const;

export const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "Secteurs", href: "/secteurs" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
  { label: "Espace client", href: CLIENT_PORTAL_URL },
] as const;

export const hero = {
  badge: "Expert sécurité & courants faibles depuis 2004",
  title: "Sécurisez vos bâtiments avec un expert terrain depuis 2004",
  subtitle:
    "Vidéoprotection, alarmes, contrôle d’accès, interphonie et réseaux courants faibles pour entreprises, syndics, commerces, bailleurs et particuliers.",
  ctaPrimary: "Demander un audit gratuit",
  ctaSecondary: "Voir nos services",
  trustStats: [
    { value: "20+", label: "ans d'expertise" },
    { value: "7", label: "métiers couverts" },
    { value: "100%", label: "audit initial gratuit" },
    { value: "2", label: "régions IDF & PACA" },
  ],
  trustSectors: [
    "Syndics & immeubles",
    "Commerces",
    "Entreprises",
    "Bailleurs sociaux",
  ],
  floatingCards: [
    { label: "+20 ans d'expertise", detail: "Depuis 2004" },
    { label: "Audit gratuit", detail: "Sans engagement" },
    { label: "Maintenance & dépannage", detail: "Intervention rapide" },
    { label: "Espace client sécurisé", detail: "Suivi centralisé" },
  ],
} as const;

export const stats = [
  { value: "20+", label: "Années d'expertise terrain", suffix: "" },
  { value: "7", label: "Domaines de sécurité & réseaux", suffix: "" },
  { value: "100%", label: "Audit initial gratuit", suffix: "" },
  { value: "6", label: "Secteurs d'activité couverts", suffix: "" },
  { value: "2", label: "Régions IDF & PACA", suffix: "+ France" },
] as const;

export const services = [
  {
    id: "videoprotection",
    title: "Vidéoprotection",
    description:
      "Installation de caméras adaptées aux commerces, immeubles, entrepôts, parkings et habitations. Accès à distance possible selon configuration.",
    detail: "Couverture intelligente des zones sensibles",
    image: "/images/videoprotection.png",
  },
  {
    id: "alarmes-intrusion",
    title: "Alarme intrusion",
    description:
      "Protection des locaux contre les intrusions avec des systèmes fiables, évolutifs et adaptés au niveau de risque.",
    detail: "Détection fiable et alerte réactive",
  },
  {
    id: "alarme-incendie",
    title: "Alarme incendie",
    description:
      "Installation et maintenance de solutions de sécurité incendie pour locaux professionnels et bâtiments collectifs.",
    detail: "Conformité et continuité d'exploitation",
  },
  {
    id: "controle-acces",
    title: "Contrôle d'accès",
    description:
      "Badges, digicodes, interphones, accès sécurisés pour immeubles, bureaux et sites sensibles.",
    detail: "Gestion fine des accès et des droits",
    image: "/images/controle-acces.png",
  },
  {
    id: "interphonie",
    title: "Interphonie",
    description:
      "Interphones audio et vidéo pour immeubles, résidences et sites professionnels avec intégration au contrôle d'accès.",
    detail: "Communication sécurisée à l'entrée",
  },
  {
    id: "reseaux",
    title: "Réseaux & courants faibles",
    description:
      "Câblage, baie informatique, prises réseau, infrastructure télécom, déplacement de prises et installation d'éclairage.",
    detail: "Infrastructure propre, évolutive et durable",
    image: "/images/reseaux.png",
  },
  {
    id: "maintenance",
    title: "Maintenance & dépannage",
    description:
      "Suivi technique, intervention rapide, diagnostic et remise en service des installations existantes.",
    detail: "Support terrain et continuité de service",
    image: "/images/maintenance.png",
  },
] as const;

export const whyChooseUs = [
  "Expertise terrain depuis 2004",
  "Solutions adaptées au bâtiment",
  "Installation propre et durable",
  "Accompagnement de l'audit à la maintenance",
  "Intervention rapide",
  "Suivi client centralisé",
] as const;

export const sectors = [
  {
    title: "Syndics & immeubles",
    description: "Vidéoprotection, interphonie et contrôle d'accès pour copropriétés.",
  },
  {
    title: "Bailleurs sociaux",
    description: "Sécurisation des halls, parkings et espaces communs.",
  },
  {
    title: "Commerces",
    description: "Protection adaptée aux flux clients et contraintes d'exploitation.",
  },
  {
    title: "Bureaux & entreprises",
    description: "Contrôle d'accès, vidéoprotection et sécurité globale des sites.",
  },
  {
    title: "Entrepôts",
    description: "Surveillance périmétrique, supervision des accès et continuité des opérations.",
  },
  {
    title: "Particuliers",
    description: "Solutions premium de protection résidentielle, discrètes et fiables.",
  },
] as const;

export const saasSection = {
  title: "Un espace client pensé pour simplifier le suivi de vos installations",
  description:
    "Centralisez vos demandes, vos équipements, vos interventions et vos documents dans un espace sécurisé relié aux services PBG TELECOM.",
  features: [
    "Accès sécurisé client",
    "Suivi des demandes",
    "Historique des interventions",
    "Centralisation des équipements",
    "Communication simplifiée",
    "Documents et informations projet",
  ],
  cta: "Accéder à mon espace client",
  image: "/images/portal-mockup.png",
} as const;

export const processSteps = [
  { step: "01", title: "Audit gratuit", description: "Analyse de vos locaux et de vos enjeux de sécurité." },
  { step: "02", title: "Étude technique", description: "Définition du niveau de risque et des contraintes terrain." },
  { step: "03", title: "Proposition adaptée", description: "Devis détaillé avec solutions adaptées et évolutives." },
  { step: "04", title: "Installation", description: "Pose professionnelle, câblage propre et configuration." },
  { step: "05", title: "Mise en service", description: "Tests, formation utilisateur et remise de documentation." },
  { step: "06", title: "Maintenance", description: "Interventions, dépannage et suivi dans la durée." },
] as const;

export const realizations = [
  {
    title: "Sécurisation d'immeubles collectifs",
    description: "Interphonie, contrôle d'accès et vidéoprotection des parties communes.",
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
      "Oui. PBG TELECOM intervient auprès des particuliers pour la vidéoprotection, les alarmes, l'interphonie et le contrôle d'accès résidentiel.",
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
  "Vidéoprotection",
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
    "PBG TELECOM est une société spécialisée dans les solutions de sécurité, vidéoprotection, alarmes, contrôle d'accès, interphonie, réseaux informatiques et courants faibles.",
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
