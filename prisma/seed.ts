import { prisma } from "../app/utils/db.server";

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        slug: "ambre-noir",
        name: "Ambre Noir",
        brand: "Maison Essences",
        family: "Oriental",
        price: 8900,
        description:
          "Un oriental ambré enveloppant, aux accents de vanille et d'encens. Élégant et mystérieux.",
        imageUrl: null,
      },
      {
        slug: "rose-velours",
        name: "Rose Velours",
        brand: "Maison Essences",
        family: "Floral",
        price: 7900,
        description:
          "Un floral sensuel où la rose se mêle à l'iris et au musc pour une caresse poudrée.",
        imageUrl: null,
      },
      {
        slug: "bois-mystique",
        name: "Bois Mystique",
        brand: "Maison Essences",
        family: "Boisé",
        price: 9900,
        description:
          "Des bois précieux et des épices fines pour une signature profonde et sophistiquée.",
        imageUrl: null,
      },
    ],
  });

  console.log("Seed terminé");
}

main().finally(async () => {
  await prisma.$disconnect();
});