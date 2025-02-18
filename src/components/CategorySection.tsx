import { Animal, AnimalStatus } from '@prisma/client';
import { AnimalCard } from './AnimalCard';
import { useState } from 'react';

interface CategorySectionProps {
  category: {
    id: string;
    name: string;
  };
  animals: Animal[];
  onDragStart: (e: React.DragEvent, animal: Animal) => void;
  onDrop: (e: React.DragEvent, categoryId: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  animals,
  onDragStart,
  onDrop,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const statusClass = {
    [AnimalStatus.NEWLY_FOUND]: 'status-newly-found',
    [AnimalStatus.READY_TO_ADOPT]: 'status-ready-to-adopt',
    [AnimalStatus.ADOPTED]: 'status-adopted',
    [AnimalStatus.UNAVAILABLE]: 'status-unavailable',
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDragOver(false);
    onDrop(e, category.id);
  };

  return (
    <div
      className={`status-section ${
        statusClass[category.id as AnimalStatus]
      } p-4 transition-all duration-200 ${
        isDragOver ? 'ring-2 ring-offset-2 ring-blue-400 scale-[1.02]' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2 className="text-xl font-bold mb-4 status-summary">
        {category.name} ({animals.length})
      </h2>
      <div className="space-y-4">
        {animals.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
};
