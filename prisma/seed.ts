import { PrismaClient, AnimalType, AnimalStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.animal.deleteMany();

  const animals = [
    {
      name: 'Max',
      type: AnimalType.DOG,
      description: 'Friendly Golden Retriever, loves to play fetch',
      status: AnimalStatus.READY_TO_ADOPT,
      age: Math.floor(Math.random() * 10) + 1,
    },
    {
      name: 'Luna',
      type: AnimalType.CAT,
      description: 'Quiet Persian cat, enjoys sunny spots',
      status: AnimalStatus.NEWLY_FOUND,
      age: Math.floor(Math.random() * 10) + 1,
    },
    {
      name: 'Charlie',
      type: AnimalType.BIRD,
      description: 'Colorful Parakeet, very musical',
      status: AnimalStatus.READY_TO_ADOPT,
      age: Math.floor(Math.random() * 10) + 1,
    },
    {
      name: 'Bella',
      type: AnimalType.DOG,
      description: 'Energetic Beagle puppy',
      status: AnimalStatus.UNAVAILABLE,
      age: Math.floor(Math.random() * 10) + 1,
    },
    {
      name: 'Oliver',
      type: AnimalType.CAT,
      description: 'Young tabby cat found near downtown',
      status: AnimalStatus.NEWLY_FOUND,
      age: Math.floor(Math.random() * 10) + 1,
    },
    {
      name: 'Milo',
      type: AnimalType.DOG,
      description: 'Happy Labrador mix who found his forever home',
      status: AnimalStatus.ADOPTED,
      age: Math.floor(Math.random() * 10) + 1,
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
