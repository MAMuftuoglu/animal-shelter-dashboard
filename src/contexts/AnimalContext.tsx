import { createContext, useContext, useState, ReactNode } from 'react';
import { Animal, AnimalStatus } from '@prisma/client';

interface AnimalContextType {
  animals: Animal[];
  updateAnimalStatus: (
    animalId: string,
    newStatus: AnimalStatus
  ) => Promise<void>;
  error: string | null;
}

const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export function AnimalProvider({
  children,
  initialAnimals,
}: {
  children: ReactNode;
  initialAnimals: Animal[];
}) {
  const [animals, setAnimals] = useState(initialAnimals);
  const [error, setError] = useState<string | null>(null);

  const updateAnimalStatus = async (
    animalId: string,
    newStatus: AnimalStatus
  ) => {
    const previousAnimals = [...animals];
    setAnimals((prev) =>
      prev.map((animal) =>
        animal.id === animalId ? { ...animal, status: newStatus } : animal
      )
    );

    try {
      const response = await fetch('/api/animals/update-status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: animalId, status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      setError(null);
    } catch (err) {
      setAnimals(previousAnimals);
      setError('Failed to update animal status. Please try again.');

      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <AnimalContext.Provider value={{ animals, updateAnimalStatus, error }}>
      {children}
    </AnimalContext.Provider>
  );
}

export function useAnimal() {
  const context = useContext(AnimalContext);
  if (context === undefined) {
    throw new Error('useAnimal must be used within an AnimalProvider');
  }
  return context;
}
