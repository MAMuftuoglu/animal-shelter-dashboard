import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';
import { Animal } from '@prisma/client';

interface HomeProps {
  animals: Animal[];
}

export default function Home({ animals }: HomeProps) {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Animal Shelter Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const animals = await prisma.animal.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    props: {
      animals: JSON.parse(JSON.stringify(animals)),
    },
  };
};
