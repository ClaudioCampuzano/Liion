import { Router } from "express";
import {
  register,
  getUserData,
  getTravels,
  updateUserDriverStatus,
  updateDriverRating,
  updateUserRating,
  createTravel,
  getDetailsOfTravel,
  UpdateSeenTravel,
  registerPassengerRequest,
  getTravelsPassenger,
  getTravelsDriver,
  deletePassengerRequest,
} from "../controllers/index";

import { checkIsAuth } from "../middleware/guard";

const router = Router({ caseSensitive: true });
router.use("/protected", checkIsAuth);
router.post("/register", register);

router.post("/updateUsersDriverStatus", checkIsAuth, updateUserDriverStatus);
router.post("/updateDriverRating", checkIsAuth, updateDriverRating);
router.post("/updateUserRating", checkIsAuth, updateUserRating);

router.post("/createTravel", createTravel);

router.post("/getUserData", checkIsAuth, getUserData);

//Metodos implicados en la busqueda de viajes
router.get("/getTravels", getTravels);
router.get("/getDetailsOfTravel/:travelId", getDetailsOfTravel);
router.patch("/UpdateSeenTravel", UpdateSeenTravel);
router.post("/registerPassengerRequest", registerPassengerRequest);

//Metodos implicados en el listado de viajes de pasajero y conductor
router.get("/getTravelsPassenger/:userUID", getTravelsPassenger);
router.get("/getTravelsDriver/:userUID", getTravelsDriver);

//Metodos implicados en el managerTravel
router.delete("/deletePassengerRequest", deletePassengerRequest);

export default router;
