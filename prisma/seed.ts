import { PrismaClient, AnimalType, AnimalStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.animal.deleteMany();

  const animals = [
    {
      name: 'Max',
      type: AnimalType.DOG,
      description: 'Friendly Golden Retriever, loves to play fetch',
      status: AnimalStatus.READY_TO_ADOPT,
      imageUrl: `https://robohash.org/Max?set=set4`,
    },
    {
      name: 'Luna',
      type: AnimalType.CAT,
      description: 'Quiet Persian cat, enjoys sunny spots',
      status: AnimalStatus.NEWLY_FOUND,
      imageUrl: `https://placekitten.com/300/300?image=1`,
    },
    {
      name: 'Charlie',
      type: AnimalType.BIRD,
      description: 'Colorful Parakeet, very musical',
      status: AnimalStatus.READY_TO_ADOPT,
      imageUrl: `https://robohash.org/Charlie?set=set4`,
    },
    {
      name: 'Bella',
      type: AnimalType.DOG,
      description: 'Energetic Beagle puppy',
      status: AnimalStatus.UNAVAILABLE,
      imageUrl: `https://robohash.org/Bella?set=set4`,
    },
    {
      name: 'Oliver',
      type: AnimalType.CAT,
      status: AnimalStatus.NEWLY_FOUND,
      imageUrl: `https://placekitten.com/300/300?image=2`,
    },
  ];

  for (const animal of animals) {
    await prisma.animal.create({ data: animal });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
