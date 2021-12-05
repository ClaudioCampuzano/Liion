import { Router } from "express";
import {
  register,
  recoverEmail,
  getUserData,
  updateUserDriverStatus,
  updateDriverRating,
  updateUserRating,
  createTravel
} from "../controllers/index";
import { checkIsAuth } from "../middleware/guard";

const router = Router();
router.use("/protected", checkIsAuth);
router.post("/getuserdata", checkIsAuth, getUserData);
router.post("/updateusersdriverstatus", checkIsAuth, updateUserDriverStatus);
router.post("/updatedriverrating",checkIsAuth,updateDriverRating)
router.post("/updateuserrating", checkIsAuth, updateUserRating)
router.post("/register", register);
router.post("/createtravel", createTravel);

export default router;
