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
  updateSeenTravel,
  registerPassengerRequest,
  getTravelsPassenger,
  getTravelsDriver,
  deletePassengerRequest,
  deleteDriverTravel,
  updateStateTravel
} from "../controllers/index";

import { checkIsAuth } from "../middleware/guard";

const router = Router({ caseSensitive: true });
router.use("/protected", checkIsAuth);
router.post("/register", register);

router.post("/updateUsersDriverStatus", checkIsAuth, updateUserDriverStatus);
router.post("/updateDriverRating", checkIsAuth, updateDriverRating);
router.post("/updateUserRating", checkIsAuth, updateUserRating);

router.post("/createTravel", createTravel);

router.get("/getUserData", getUserData);

//Metodos implicados en la busqueda de viajes
router.get("/getTravels", getTravels);
router.get("/getDetailsOfTravel", getDetailsOfTravel);
router.patch("/updateSeenTravel", updateSeenTravel);
router.post("/registerPassengerRequest", registerPassengerRequest);

//Metodos implicados en el listado de viajes de pasajero y conductor
router.get("/getTravelsPassenger", getTravelsPassenger);
router.get("/getTravelsDriver", getTravelsDriver);

//Metodos implicados en el managerTravel
router.delete("/deletePassengerRequest", deletePassengerRequest);
router.delete("/deleteDriverTravel", deleteDriverTravel);
router.patch("/updateStateTravel", updateStateTravel);


export default router;
