import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';
import { Animal, AnimalStatus } from '@prisma/client';
import { AnimalCard } from '@/components/AnimalCard';

interface HomeProps {
  animals: Animal[];
}

const statusConfig = {
  READY_TO_ADOPT: {
    className: 'status-ready-to-adopt',
    label: 'Ready to Adopt',
  },
  ADOPTED: {
    className: 'status-adopted',
    label: 'Adopted',
  },
  NEWLY_FOUND: {
    className: 'status-newly-found',
    label: 'Newly Found',
  },
  UNAVAILABLE: {
    className: 'status-unavailable',
    label: 'Unavailable',
  },
} as const;

export default function Home({ animals }: HomeProps) {
  const animalsByStatus = animals.reduce((acc, animal) => {
    const status = animal.status || AnimalStatus.UNAVAILABLE;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(animal);
    return acc;
  }, {} as Record<string, Animal[]>);

  return (
    <div className="space-y-6 p-6">
      {Object.entries(animalsByStatus)
        .sort(([a], [b]) => {
          const order = [
            'ADOPTED',
            'READY_TO_ADOPT',
            'NEWLY_FOUND',
            'UNAVAILABLE',
          ];
          return order.indexOf(a) - order.indexOf(b);
        })
        .map(([status, statusAnimals]) => (
          <details
            key={status}
            className={`status-section ${
              statusConfig[status as keyof typeof statusConfig]?.className ||
              'bg-gray-100 border-gray-500'
            }`}
            open={false}
          >
            <summary className="status-summary">
              {statusConfig[status as keyof typeof statusConfig]?.label ||
                status}{' '}
              ({statusAnimals.length})
            </summary>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statusAnimals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>
            </div>
          </details>
        ))}
    </div>
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
