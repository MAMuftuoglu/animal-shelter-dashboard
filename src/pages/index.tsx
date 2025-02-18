import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';
import { Animal, AnimalStatus } from '@prisma/client';
import { useAnimal } from '@/contexts/AnimalContext';
import { CategorySection } from '@/components/CategorySection';

interface HomeProps {
  initialAnimals: Animal[];
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

export default function Home({ initialAnimals }: HomeProps) {
  const { animals, setAnimals, updateAnimalStatus, error } = useAnimal();

  if (animals.length === 0 && initialAnimals.length > 0) {
    setAnimals(initialAnimals);
  }

  const currentAnimals = animals.length > 0 ? animals : initialAnimals;

  const animalsByStatus = currentAnimals.reduce((acc, animal) => {
    const status = animal.status || AnimalStatus.UNAVAILABLE;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(animal);
    return acc;
  }, {} as Record<string, Animal[]>);

  const handleDragStart = (e: React.DragEvent, animal: Animal) => {
    e.dataTransfer.setData('animalId', animal.id.toString());
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const animalId = e.dataTransfer.getData('animalId');
    await updateAnimalStatus(animalId, newStatus as AnimalStatus);
  };

  return (
    <main className="container mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Object.entries(AnimalStatus)
          .sort(([a], [b]) => {
            const order = [
              'ADOPTED',
              'READY_TO_ADOPT',
              'NEWLY_FOUND',
              'UNAVAILABLE',
            ];
            return order.indexOf(a) - order.indexOf(b);
          })
          .map(([status]) => (
            <CategorySection
              key={status}
              category={{
                id: status,
                name:
                  statusConfig[status as keyof typeof statusConfig]?.label ||
                  status,
              }}
              animals={animalsByStatus[status] || []}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
            />
          ))}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const animals = await prisma.animal.findMany();
  return {
    props: {
      initialAnimals: JSON.parse(JSON.stringify(animals)),
    },
  };
};
