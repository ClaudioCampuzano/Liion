import { Router } from "express";
import {
  register,
  getUserData,
  getTravels,
  updateUserDriverStatus,
  updateDriverRating,
  updateUserRating,
  createTravel
} from "../controllers/index";

import { checkIsAuth } from "../middleware/guard";

const router = Router({caseSensitive: true});
router.use("/protected", checkIsAuth);
router.post("/register", register);

router.post("/updateUsersDriverStatus", checkIsAuth, updateUserDriverStatus);
router.post("/updateDriverRating",checkIsAuth,updateDriverRating)
router.post("/updateUserRating", checkIsAuth, updateUserRating)

router.post("/createTravel",checkIsAuth, createTravel);

router.post("/getUserData", checkIsAuth, getUserData);
router.post("/getTravels", getTravels);


export default router;
