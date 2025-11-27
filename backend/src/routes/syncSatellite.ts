import { Router } from 'express';
import { SyncSatelliteController } from '../controllers/syncSatellite';

const syncSatelliteRoutes = Router();
const controller = new SyncSatelliteController();

syncSatelliteRoutes.post('/', controller.setupSatellites);

syncSatelliteRoutes.post('/:id', controller.syncSatellitesById);


export default syncSatelliteRoutes;
