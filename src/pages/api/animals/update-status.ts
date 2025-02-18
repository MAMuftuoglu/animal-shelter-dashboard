import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { AnimalStatus } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!Object.values(AnimalStatus).includes(status)) {
      return res.status(400).json({
        message: 'Invalid status',
        receivedStatus: status,
        validStatuses: Object.values(AnimalStatus),
      });
    }

    const updatedAnimal = await prisma.animal.update({
      where: { id },
      data: { status: status as AnimalStatus },
    });

    return res.status(200).json(updatedAnimal);
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ message: 'Error updating animal status' });
  }
}
