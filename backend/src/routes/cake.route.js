import express from "express";
const router = express.Router();
import cakeController from "../controllers/cake.controller.js";

//seed route
//!!!!! to be taken out for deployment
router.get("/seed", cakeController.seed);

//Index Route
//*****     get     /braindump/
//*****     returns all entries
// NOTE: if the number of entries gets too large,
// this may be updated to imit the number returned
router.get("/", cakeController.getEntries);

export default router;
