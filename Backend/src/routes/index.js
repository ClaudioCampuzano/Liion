import { Router } from "express";
import {
  register,
  recoverEmail,
  getUserData,
  updateUserDriverStatus,
} from "../controllers/index";
import { checkIsAuth } from "../middleware/guard";

const router = Router();
router.use("/protected", checkIsAuth);
router.post("/getuserdata", checkIsAuth, getUserData);
router.post("/updateusersdriverstatus", checkIsAuth, updateUserDriverStatus);
router.post("/register", register);

export default router;
