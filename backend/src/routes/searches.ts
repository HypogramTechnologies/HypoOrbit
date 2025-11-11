import { Router } from "express";
import { SearchesController } from "../controllers/searches";
import { se } from "date-fns/locale";

const router = Router();
const searchesController = new SearchesController();
router.post("/", searchesController.createSearch);
router.get("/", searchesController.getSearches);
router.get("/lasts", searchesController.getLastSearches);
router.delete("/", searchesController.deleteAllSearches);

export default router;