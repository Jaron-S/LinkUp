import express from "express";
import { wakeMe } from "../controllers/wake.js";

const router = express.Router();

router.get("/", wakeMe);

export default router;
