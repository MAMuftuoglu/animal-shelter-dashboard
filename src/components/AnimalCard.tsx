import { Animal, AnimalStatus } from '@prisma/client';

interface AnimalCardProps {
  animal: Animal;
}

export function AnimalCard({ animal }: AnimalCardProps) {
  const getAnimalStatusName = (status: AnimalStatus) => {
    switch (status) {
      case AnimalStatus.NEWLY_FOUND:
        return 'Newly Found';
      case AnimalStatus.READY_TO_ADOPT:
        return 'Ready to Adopt';
      case AnimalStatus.ADOPTED:
        return 'Adopted';
      case AnimalStatus.UNAVAILABLE:
        return 'Unavailable';
    }
  };

  const backgroundColor = {
    [AnimalStatus.NEWLY_FOUND]: 'bg-yellow-100',
    [AnimalStatus.READY_TO_ADOPT]: 'bg-green-100',
    [AnimalStatus.ADOPTED]: 'bg-blue-100',
    [AnimalStatus.UNAVAILABLE]: 'bg-gray-100',
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow ${
        backgroundColor[animal.status]
      }`}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {animal.name} ({animal.age} years old)
      </h2>
      <div className="text-gray-600 space-y-2">
        <p>Species: {animal.type}</p>
        <p>Description: {animal.description}</p>
        <p>Status: {getAnimalStatusName(animal.status)}</p>
      </div>
    </div>
  );
}
