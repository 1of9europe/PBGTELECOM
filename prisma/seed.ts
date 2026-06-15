import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seed PBG TELECOM...");

  await prisma.intervention.deleteMany();
  await prisma.clientDocument.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.maintenanceContract.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.site.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.customer.deleteMany();

  const passwordHash = await bcrypt.hash("Password123!", 12);

  const syndic = await prisma.customer.create({
    data: {
      companyName: "Syndic Résidence Les Oliviers",
      contactName: "Marie Dupont",
      email: "contact@oliviers-syndic.fr",
      phone: "04 91 00 12 34",
      address: "12 Avenue des Oliviers, 13008 Marseille",
      type: "SYNDIC",
      status: "ACTIVE",
    },
  });

  const entreprise = await prisma.customer.create({
    data: {
      companyName: "Boulangerie Martin & Fils",
      contactName: "Jean Martin",
      email: "jean.martin@boulangerie-martin.fr",
      phone: "04 91 55 78 90",
      address: "45 Rue de la République, 13001 Marseille",
      type: "SHOP",
      status: "ACTIVE",
    },
  });

  const copro = await prisma.customer.create({
    data: {
      companyName: "SCI Immeuble Le Parc",
      contactName: "Philippe Bernard",
      email: "p.bernard@sci-leparc.fr",
      phone: "04 91 22 33 44",
      address: "8 Boulevard Michelet, 13009 Marseille",
      type: "COMPANY",
      status: "ACTIVE",
    },
  });

  const siteOliviers = await prisma.site.create({
    data: {
      customerId: syndic.id,
      name: "Résidence Les Oliviers — Entrée principale",
      address: "12 Avenue des Oliviers, 13008 Marseille",
      accessInstructions: "Digicode 4589A — interphone gardien",
      notes: "3 cages d'escalier, parking sous-sol",
    },
  });

  const siteBoulangerie = await prisma.site.create({
    data: {
      customerId: entreprise.id,
      name: "Boulangerie Martin — Boutique",
      address: "45 Rue de la République, 13001 Marseille",
      accessInstructions: "Accès libre en journée, clé chez le gérant le soir",
      notes: "Alarme Verisure connectée",
    },
  });

  const siteParc = await prisma.site.create({
    data: {
      customerId: copro.id,
      name: "Immeuble Le Parc — Local technique",
      address: "8 Boulevard Michelet, 13009 Marseille",
      accessInstructions: "Badge PBG requis — contacter le gardien",
      notes: "Baie réseau au sous-sol",
    },
  });

  const superAdmin = await prisma.user.create({
    data: {
      name: "Yacine Yoldi",
      email: "admin@pbgtelecom.fr",
      password: passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Sophie Laurent",
      email: "sophie@pbgtelecom.fr",
      password: passwordHash,
      role: Role.ADMIN,
    },
  });

  const tech1 = await prisma.user.create({
    data: {
      name: "Karim Benali",
      email: "karim@pbgtelecom.fr",
      password: passwordHash,
      role: Role.TECHNICIAN,
    },
  });

  const tech2 = await prisma.user.create({
    data: {
      name: "Thomas Mercier",
      email: "thomas@pbgtelecom.fr",
      password: passwordHash,
      role: Role.TECHNICIAN,
    },
  });

  await prisma.user.create({
    data: {
      name: "Marie Dupont",
      email: "client@oliviers-syndic.fr",
      password: passwordHash,
      role: Role.CUSTOMER,
      customerId: syndic.id,
    },
  });

  await prisma.user.create({
    data: {
      name: "Jean Martin",
      email: "client@boulangerie-martin.fr",
      password: passwordHash,
      role: Role.CUSTOMER,
      customerId: entreprise.id,
    },
  });

  await prisma.equipment.createMany({
    data: [
      {
        siteId: siteOliviers.id,
        type: "NVR",
        brand: "Hikvision",
        model: "DS-7732NI-K4",
        serialNumber: "HK-NVR-2024-001",
        ipAddress: "192.168.1.10",
        installDate: new Date("2023-06-15"),
        warrantyEndDate: new Date("2026-06-15"),
        status: "ONLINE",
        notes: "32 canaux, 8 To stockage",
      },
      {
        siteId: siteOliviers.id,
        type: "CAMERA",
        brand: "Hikvision",
        model: "DS-2CD2143G2-I",
        serialNumber: "HK-CAM-OLV-01",
        ipAddress: "192.168.1.101",
        installDate: new Date("2023-06-15"),
        status: "ONLINE",
        notes: "Hall entrée principale",
      },
      {
        siteId: siteOliviers.id,
        type: "CAMERA",
        brand: "Hikvision",
        model: "DS-2CD2143G2-I",
        serialNumber: "HK-CAM-OLV-02",
        ipAddress: "192.168.1.102",
        installDate: new Date("2023-06-15"),
        status: "OFFLINE",
        notes: "Parking — caméra hors ligne depuis 2 jours",
      },
      {
        siteId: siteBoulangerie.id,
        type: "DVR",
        brand: "Dahua",
        model: "XVR5108HS-I3",
        serialNumber: "DH-DVR-2022-045",
        ipAddress: "192.168.0.50",
        installDate: new Date("2022-03-10"),
        warrantyEndDate: new Date("2024-03-10"),
        status: "ONLINE",
        notes: "4 caméras intérieures + extérieure",
      },
      {
        siteId: siteBoulangerie.id,
        type: "ACCESS_CONTROL",
        brand: "Somfy",
        model: "Visionic",
        serialNumber: "SM-AC-7789",
        installDate: new Date("2022-03-10"),
        status: "ONLINE",
        notes: "Contrôle d'accès arrière-boutique",
      },
      {
        siteId: siteParc.id,
        type: "SWITCH",
        brand: "Ubiquiti",
        model: "USW-24-POE",
        serialNumber: "UB-SW-2024-112",
        ipAddress: "192.168.10.1",
        installDate: new Date("2024-01-20"),
        status: "ONLINE",
      },
      {
        siteId: siteParc.id,
        type: "ROUTER",
        brand: "MikroTik",
        model: "hEX S",
        serialNumber: "MT-RTR-8890",
        ipAddress: "192.168.10.254",
        installDate: new Date("2024-01-20"),
        status: "ONLINE",
      },
    ],
  });

  const cameras = await prisma.equipment.findMany({
    where: { type: "CAMERA", siteId: siteOliviers.id },
  });

  await prisma.maintenanceContract.createMany({
    data: [
      {
        customerId: syndic.id,
        name: "Contrat Premium Vidéoprotection",
        monthlyPrice: 189.0,
        startDate: new Date("2023-07-01"),
        endDate: new Date("2026-06-30"),
        status: "ACTIVE",
        includedVisitsPerYear: 4,
        responseTimeHours: 8,
        notes: "Inclut 2 visites préventives/an + hotline 7j/7",
      },
      {
        customerId: entreprise.id,
        name: "Maintenance Standard Commerce",
        monthlyPrice: 79.0,
        startDate: new Date("2022-04-01"),
        status: "ACTIVE",
        includedVisitsPerYear: 2,
        responseTimeHours: 24,
      },
      {
        customerId: copro.id,
        name: "Contrat Réseau & Sécurité",
        monthlyPrice: 149.0,
        startDate: new Date("2024-02-01"),
        endDate: new Date("2027-01-31"),
        status: "ACTIVE",
        includedVisitsPerYear: 3,
        responseTimeHours: 12,
      },
    ],
  });

  await prisma.subscription.createMany({
    data: [
      {
        customerId: syndic.id,
        planName: "Monitoring Cloud NVR",
        priceMonthly: 49.0,
        status: "ACTIVE",
      },
      {
        customerId: copro.id,
        planName: "Supervision réseau 24/7",
        priceMonthly: 99.0,
        status: "ACTIVE",
      },
    ],
  });

  await prisma.clientDocument.createMany({
    data: [
      {
        customerId: syndic.id,
        title: "Devis modernisation vidéoprotection 2026",
        type: "QUOTE",
        fileUrl: "/mock/documents/devis-modernisation-2026.pdf",
      },
      {
        customerId: syndic.id,
        title: "Contrat maintenance premium",
        type: "CONTRACT",
        fileUrl: "/mock/documents/contrat-premium.pdf",
      },
      {
        customerId: entreprise.id,
        title: "Facture maintenance avril 2026",
        type: "INVOICE",
        fileUrl: "/mock/documents/facture-avril-2026.pdf",
      },
    ],
  });

  const ticket1 = await prisma.ticket.create({
    data: {
      customerId: syndic.id,
      siteId: siteOliviers.id,
      equipmentId: cameras.find((c) => c.status === "OFFLINE")?.id,
      title: "Caméra parking hors ligne",
      description:
        "La caméra du parking sous-sol (HK-CAM-OLV-02) ne remonte plus d'image depuis 48h. Le syndic signale des zones d'ombre la nuit.",
      priority: "HIGH",
      status: "IN_PROGRESS",
      createdById: admin.id,
      assignedToId: tech1.id,
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      customerId: entreprise.id,
      siteId: siteBoulangerie.id,
      title: "Mise à jour firmware DVR",
      description:
        "Planifier une mise à jour firmware sur le DVR Dahua et vérifier l'enregistrement nocturne sur la caméra extérieure.",
      priority: "MEDIUM",
      status: "OPEN",
      createdById: superAdmin.id,
      assignedToId: tech2.id,
    },
  });

  await prisma.ticket.create({
    data: {
      customerId: copro.id,
      siteId: siteParc.id,
      title: "Audit câblage baie réseau",
      description: "Demande d'audit du câblage RJ45 et étiquetage des ports switch pour conformité.",
      priority: "LOW",
      status: "OPEN",
      createdById: admin.id,
    },
  });

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 3);
  nextWeek.setHours(9, 0, 0, 0);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(14, 30, 0, 0);

  await prisma.intervention.createMany({
    data: [
      {
        ticketId: ticket1.id,
        siteId: siteOliviers.id,
        technicianId: tech1.id,
        scheduledAt: tomorrow,
        status: "PLANNED",
        report: "",
      },
      {
        ticketId: ticket2.id,
        siteId: siteBoulangerie.id,
        technicianId: tech2.id,
        scheduledAt: nextWeek,
        status: "PLANNED",
        report: "",
      },
      {
        siteId: siteParc.id,
        technicianId: tech1.id,
        scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "PLANNED",
        report: "Visite préventive trimestrielle — contrôle switch et routeur",
      },
    ],
  });

  console.log("✅ Seed terminé avec succès");
  console.log("");
  console.log("Comptes de test (mot de passe : Password123!)");
  console.log("  Super Admin : admin@pbgtelecom.fr");
  console.log("  Admin       : sophie@pbgtelecom.fr");
  console.log("  Technicien  : karim@pbgtelecom.fr");
  console.log("  Technicien  : thomas@pbgtelecom.fr");
  console.log("  Client      : client@oliviers-syndic.fr");
  console.log("  Client      : client@boulangerie-martin.fr");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
