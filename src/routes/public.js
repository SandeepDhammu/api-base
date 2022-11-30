import express from "express";
import { upload } from "../controllers/uploads.js";
import { searchCountries,searchStates } from "../controllers/countries.js";
import decorate from "../middlewares/response.js";

const publicRouter  = express.Router();

publicRouter.use(decorate);
publicRouter.post('/upload', upload);
publicRouter.get('/countires', searchCountries);
publicRouter.get('/states', searchStates);

export default publicRouter;