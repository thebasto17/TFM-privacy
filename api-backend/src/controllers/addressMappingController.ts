import { Request, Response } from 'express';
import { createMapping, getMapping, updateMapping, deleteMapping, listMappings } from '../services/addressMappingService';

export const createMappingHandler = async (req: Request, res: Response) => {
  try {
    const mapping = await createMapping(req.body);
    res.status(201).json(mapping);
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Address mapping already exists' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

export const listMappingsHandler = async (req: Request, res: Response) => {
  try {
    const mappings = await listMappings();
    res.status(200).json(mappings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export const getMappingHandler = async (req: Request, res: Response) => {
  try {
    const { randomNumber } = req.params;
    const mapping = await getMapping(randomNumber);
    if (mapping) {
      res.status(200).json(mapping);
    } else {
      res.status(404).json({ error: 'Address mapping not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMappingHandler = async (req: Request, res: Response) => {
  try {
    const { randomNumber } = req.params;
    const mapping = await updateMapping(randomNumber, req.body);
    if (mapping) {
      res.status(200).json(mapping);
    } else {
      res.status(404).json({ error: 'Address mapping not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMappingHandler = async (req: Request, res: Response) => {
  try {
    const { randomNumber } = req.params;
    const mapping = await deleteMapping(randomNumber);
    if (mapping) {
      res.status(200).json({ message: 'Address mapping deleted' });
    } else {
      res.status(404).json({ error: 'Address mapping not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
