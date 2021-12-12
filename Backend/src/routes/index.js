import { Router } from "express";
import {
  register,
  getUserData,
  getTravels,
  updateUserDriverStatus,
  updateDriverRating,
  updateUserRating,
  createTravel,
  getT
} from "../controllers/index";

import { checkIsAuth } from "../middleware/guard";

const router = Router({caseSensitive: true});
router.use("/protected", checkIsAuth);
router.post("/register", register);

router.post("/updateUsersDriverStatus", checkIsAuth, updateUserDriverStatus);
router.post("/updateDriverRating",checkIsAuth,updateDriverRating)
router.post("/updateUserRating", checkIsAuth, updateUserRating)

router.post("/createTravel", createTravel);

router.post("/getUserData", checkIsAuth, getUserData);
router.get("/getTravels", getTravels);
router.get("/getT", getT);



export default router;
