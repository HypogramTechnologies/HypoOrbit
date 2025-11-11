import { Router } from 'express';
import { WTSSController } from '../controllers/wtss';

const wtssRouter = Router();
const wtssController = new WTSSController();

// GET /wtss/coverages
wtssRouter.get('/coverages', wtssController.coverages);

// GET /wtss/coverage/:coverage
wtssRouter.get('/coverage/:coverage', wtssController.coverageDetails);

// GET /wtss/time_series/:coverage/:attributes/:startDate/:endDate/:latitude/:longitude
wtssRouter.get('/time_series/:coverage/:attributes/:startDate/:endDate/:latitude/:longitude', wtssController.timeSeries);

// POST /wtss/attributes_coverages
wtssRouter.post('/attributes_coverages', wtssController.attributesCoverages);

// POST /wtts/time_series_coverages
wtssRouter.post('/time_series_coverages', wtssController.timeSeriesCoverages);

// GET /stac/collections/:id/update-time
wtssRouter.get('/coverage/:coverage/update-time', wtssController.getUpdateTime);


export default wtssRouter;