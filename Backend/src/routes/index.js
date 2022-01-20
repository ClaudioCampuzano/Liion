import { Router } from "express";
import {
  register,
  getUserData,
  getTravels,
  updateUserDriverStatus,
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
  getTravelPartners,
  updateUserRanting
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

//Metodos implicado travel en curso
router.patch("/updateUserLocationInTravel",/* checkTokenValidityBody, */ updateUserLocationInTravel);
router.put("/updateTravelItinerary",/* checkTokenValidityBody, */ updateTravelItinerary);
router.get("/getTravelItinerary",/* checkTokenValidityQuery, */ getTravelItinerary);
router.get("/getPassengerTravelItinerary",/* checkTokenValidityQuery, */ getPassengerTravelItinerary);
router.get("/getRouteCoordinates",/* checkTokenValidityQuery, */ getRouteCoordinates);

//Metodos implicado en el feedback
router.get("/getTravelPartners",/* checkTokenValidityQuery, */ getTravelPartners);
router.patch("/updateUserRanting",/* checkTokenValidityQuery, */ updateUserRanting);

router.post("/updateUsersDriverStatus", checkIsAuth, updateUserDriverStatus);
router.get("/getupcomingTravels/:userUID",getupcomingTravels);
router.post('/notifToPassengers',notifToPassengers)
router.post('/testFcm', fcmTest);
router.post("/updateTokenFcm", checkIsAuth, upDateFcmToken)


export default router;
