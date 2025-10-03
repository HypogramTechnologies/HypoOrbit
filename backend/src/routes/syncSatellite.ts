import { Router } from 'express';
import { SyncSatelliteController } from '../controllers/syncSatellite';

const syncSatelliteRoutes = Router();
const controller = new SyncSatelliteController();

syncSatelliteRoutes.post('/', (req, res) => controller.setupSatellites(req, res));

syncSatelliteRoutes.post('/:id', (req, res) => controller.syncSatellitesById(req, res));


export default syncSatelliteRoutes;
