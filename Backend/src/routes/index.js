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
  getStatusRun,
  updateUserLocationInTravel,
  getRouteCoordinates,
  getTravelItinerary,
  updateTravelItinerary,
  getPassengerTravelItinerary,
  upDateFcmToken,
  getupcomingTravels,
  fcmTest,
  notifToPassengers
} from "../controllers/index";

import {
  checkIsAuth,
  checkTokenValidityBody,
  checkTokenValidityQuery,
} from "../middleware/guard";


const router = Router({ caseSensitive: true });

//descomente para solucionar los comflicos mas facil.. comentar denuevo
//agregar checkeo de token alos metodos que faltan
router.use("/protected", checkIsAuth);
router.post("/register", register);
router.post("/createTravel", /* checkTokenValidityBody, */ createTravel);
router.get("/getUserData", /* checkTokenValidityQuery, */ getUserData);
router.get("/getStatusRun", getStatusRun);
router.get("/getTravels", /* checkTokenValidityQuery, */ getTravels);
router.get("/getDetailsOfTravel",/* checkTokenValidityQuery, */ getDetailsOfTravel);
router.patch("/updateSeenTravel",/* checkTokenValidityBody, */ updateSeenTravel);
router.post("/registerPassengerRequest",/* checkTokenValidityBody, */ registerPassengerRequest);
router.get("/getTravelsPassenger",/* checkTokenValidityQuery, */ getTravelsPassenger);
router.get("/getTravelsDriver",/* checkTokenValidityQuery, */ getTravelsDriver);
router.delete("/deletePassengerRequest",/* checkTokenValidityBody, */ deletePassengerRequest);
router.delete("/deleteDriverTravel",/* checkTokenValidityBody, */ deleteDriverTravel);
router.patch("/updateStateTravel",/* checkTokenValidityBody, */ updateStateTravel);
router.patch("/updateUserLocationInTravel",/* checkTokenValidityBody, */ updateUserLocationInTravel);
router.put("/updateTravelItinerary",/* checkTokenValidityBody, */ updateTravelItinerary);
router.get("/getTravelItinerary",/* checkTokenValidityQuery, */ getTravelItinerary);
router.get("/getPassengerTravelItinerary",/* checkTokenValidityQuery, */ getPassengerTravelItinerary);
router.get("/getRouteCoordinates",/* checkTokenValidityQuery, */ getRouteCoordinates);
router.post("/updateUsersDriverStatus", checkIsAuth, updateUserDriverStatus);
router.post("/updateDriverRating", checkIsAuth, updateDriverRating);
router.post("/updateTokenFcm", checkIsAuth, upDateFcmToken)
router.post("/updateUserRating", checkIsAuth, updateUserRating);
router.post('/testFcm', fcmTest);
router.post('/notifToPassengers',notifToPassengers)
router.get("/getupcomingTravels/:userUID",getupcomingTravels);

export default router;
