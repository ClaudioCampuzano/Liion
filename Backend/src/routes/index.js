import { Router } from "express";
import { register } from "../controllers/index";
import { checkIsAuth } from "../middleware/guard";

const router = Router();

router.post("/register", register);

router.use("/protected", checkIsAuth);

export default router;
