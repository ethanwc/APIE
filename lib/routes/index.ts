import { Router } from "express";
import AuthRouter from "./Auth";
import DeviceRouter from "./Device";
import DataRouter from './Data';
import * as jwtConfig from "../middleware/jwtAuth";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/auth", AuthRouter);
router.use("/device", jwtConfig.isAuthenticated, DeviceRouter);
router.use("/data", jwtConfig.isAuthenticated, DataRouter);


// Export the base-router
export default router;