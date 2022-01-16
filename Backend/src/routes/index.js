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
  updateStateTravel,
  upDateFcmToken,
  getupcomingTravels,
  fcmTest,
  notifToPassengers
} from "../controllers/index";

import { checkIsAuth } from "../middleware/guard";

const router = Router({ caseSensitive: true });
router.use("/protected", checkIsAuth);
router.post("/register", register);

router.post("/updateUsersDriverStatus", checkIsAuth, updateUserDriverStatus);
router.post("/updateDriverRating", checkIsAuth, updateDriverRating);
router.post("/updateTokenFcm", checkIsAuth, upDateFcmToken)
router.post("/updateUserRating", checkIsAuth, updateUserRating);

router.post("/createTravel", createTravel);

router.post("/getUserData", checkIsAuth, getUserData);

//Metodos implicados en la busqueda de viajes
router.get("/getTravels", getTravels);
router.get("/getDetailsOfTravel/:travelId", getDetailsOfTravel);
router.patch("/updateSeenTravel", updateSeenTravel);
router.post("/registerPassengerRequest", registerPassengerRequest);

//Metodos implicados en el listado de viajes de pasajero y conductor
router.get("/getTravelsPassenger/:userUID", getTravelsPassenger);
router.get("/getTravelsDriver/:userUID", getTravelsDriver);

//Metodos implicados en el managerTravel
router.delete("/deletePassengerRequest", deletePassengerRequest);
router.delete("/deleteDriverTravel", deleteDriverTravel);
router.patch("/updateStateTravel", updateStateTravel);

router.post('/testFcm', fcmTest);
router.post('/notifToPassengers',notifToPassengers)
router.get("/getupcomingTravels/:userUID",getupcomingTravels);


export default router;
