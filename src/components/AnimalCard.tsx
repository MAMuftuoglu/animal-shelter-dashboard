import { Animal, AnimalStatus, AnimalType } from '@prisma/client';
import { useState } from 'react';

interface AnimalCardProps {
  animal: Animal;
  onDragStart: (e: React.DragEvent, animal: Animal) => void;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({
  animal,
  onDragStart,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const getAnimalTypeName = (type: AnimalType) => {
    switch (type) {
      case AnimalType.DOG:
        return 'Dog';
      case AnimalType.CAT:
        return 'Cat';
      case AnimalType.BIRD:
        return 'Bird';
      case AnimalType.OTHER:
        return 'Other';
    }
  };

  const backgroundColor = {
    [AnimalStatus.NEWLY_FOUND]: 'bg-yellow-100',
    [AnimalStatus.READY_TO_ADOPT]: 'bg-green-100',
    [AnimalStatus.ADOPTED]: 'bg-blue-100',
    [AnimalStatus.UNAVAILABLE]: 'bg-gray-100',
  };

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    onDragStart(e, animal);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`rounded-lg shadow p-6 transition-all duration-200 cursor-move ${
        backgroundColor[animal.status]
      } ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-[1.02]'}`}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {animal.name} ({animal.age} years old)
      </h2>
      <div className="text-gray-600 space-y-2">
        <p>Species: {getAnimalTypeName(animal.type)}</p>
        <p>Description: {animal.description}</p>
      </div>
    </div>
  );
};
