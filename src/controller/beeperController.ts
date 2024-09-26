import { Request,Response } from "express"
import jsonfile from "jsonfile"

export interface Beepper {
    id : number,
    name : string,
    status : string,
    created_at : Date,
    detonated_at : Date,
    latitude : number,
    longitude : number
}

const dbPath = './src/data/db.json';


export const getBeeper = async (req: Request, res: Response) => {
    try {
      const db = await jsonfile.readFile(dbPath)
      const beepers: Beepper[] = db.beeperList;
      res.json(beepers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve beeper' });
    }
  };

  export const getBeeperById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const db = await jsonfile.readFile(dbPath)
      const beeper = db.beeperList.find((b: Beepper) => b.id === parseInt(id));
      res.json(beeper);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve beeper' });
    }
  };

  export const getBeeperByStatus = async (req: Request, res: Response) => {
    const { status } = req.params;
    try {
      const db = await jsonfile.readFile(dbPath)
      const beeper = db.beeperList.filter((b: Beepper) => b.status === status);
      res.json(beeper);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve beeper' });
    }
  };

  export const createBeeper = async (req: Request, res: Response) => {
    const {id,name,status,created_at,detonated_at,latitude,longitude } = req.body;
  
    try {
      const newBeeper = {
        id,
        name,
        status,
        created_at,
        detonated_at,
        latitude,
        longitude

       };
  
      const db = await jsonfile.readFile(dbPath);
      db.beeperList.push(newBeeper);
      await jsonfile.writeFile(dbPath, db);
  
      res.status(201).json({beeper: newBeeper });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add beeper' });
    }
  };


  export const deleteBeeper = async (req: any, res: any) => {
    const { id } = req.params;
  
    try {
      const db = await jsonfile.readFile(dbPath);
      const beeperIndex = db.beeperList.findIndex((b: Beepper) => b.id === parseInt(id));
  
      if (beeperIndex === -1) {
        return res.status(404).json({ error: 'beeper not found' });
      }
  
      db.beeperList.splice(beeperIndex, 1);
      await jsonfile.writeFile(dbPath, db);
  
      res.json({ message: 'beeper deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete beeper'});
    }
  };


  export const updateStatus = async (req: any, res: any) => {
    const { id } = req.params; 
    const {status} = req.body; 
  
    try {
      const db = await jsonfile.readFile(dbPath);
        
      const beeperIndex = db.beeperList.findIndex((b: Beepper) => b.id === parseInt(id));
  
      if (beeperIndex === -1) {
        return res.status(404).json({ error: 'Beeper not found' });
      }
       
      db.beeperList[beeperIndex] = {
        ...db.beeperList[beeperIndex],  
        status
      };    
      await jsonfile.writeFile(dbPath, db);
      res.json(db.beeperList[beeperIndex]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update beeper'});
    }
  };




 
    
