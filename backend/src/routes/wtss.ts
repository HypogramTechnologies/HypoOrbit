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

export default wtssRouter;