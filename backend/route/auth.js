import express from "express";
import { signin, signup } from "../controller/auth-controller.js";
import verifyToken from "../middleware/verify-token.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
