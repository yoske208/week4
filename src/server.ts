import express, { Request, Response } from 'express';
import {Beepper,getBeeper,createBeeper,getBeeperById,updateStatus,deleteBeeper,getBeeperByStatus} from "./controller/beeperController"
import  bodyParser  from 'body-parser'
import jsonfile from "jsonfile"



const app = express();
app.use(express.json())
app.use(bodyParser.json())

const port: number = 3000;


app.get("/beeper",getBeeper)
app.post("/beeper",createBeeper)
app.get("/beeper/:id",getBeeperById)
app.put("/beeper/:id",updateStatus)
app.delete("/beeper/:id",deleteBeeper)
app.get("/beeper/status/:status",getBeeperByStatus)


app.listen(port, () => {
  console.log(`Server i555s running on http://localhost:${port}`);
});