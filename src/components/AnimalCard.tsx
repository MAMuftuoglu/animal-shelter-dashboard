import { Animal } from '@prisma/client';

interface AnimalCardProps {
  animal: Animal;
}

export function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {animal.name} ({animal.age} years old)
      </h2>
      <div className="text-gray-600 space-y-2">
        <p>Species: {animal.type}</p>
        <p>Description: {animal.description}</p>
        <p>Status: {animal.status}</p>
      </div>
    </div>
  );
}
