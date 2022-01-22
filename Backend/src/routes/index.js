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
  getTravelPartners,
  updateUserRanting,
  upDateFcmToken,
  getUpcomingTravels,
  notifToPassengers,
  fcmTest,
} from "../controllers/index";

import {
  checkIsAuth,
  checkTokenValidityBody,
  checkTokenValidityQuery,
} from "../middleware/guard";

const router = Router({ caseSensitive: true });

/* Metodos implicados en el login */
router.post("/register", register);
router.get("/getStatusRun", getStatusRun);
router.get("/getUserData", /* checkTokenValidityQuery, */ getUserData);

/*Metodos implicados en la busqueda de viajes */
router.get("/getTravels", /* checkTokenValidityQuery, */ getTravels);
router.patch("/updateSeenTravel",/* checkTokenValidityBody, */ updateSeenTravel);
router.post("/registerPassengerRequest",/* checkTokenValidityBody, */ registerPassengerRequest);

/*Metodos implicados en la creacion de viajes */
router.post("/createTravel", /* checkTokenValidityBody, */ createTravel);

/*Metodos implicados en el display de viajes para los roles pasajero/conductor*/
router.get("/getTravelsPassenger",/* checkTokenValidityQuery, */ getTravelsPassenger);
router.get("/getTravelsDriver",/* checkTokenValidityQuery, */ getTravelsDriver);
router.delete("/deletePassengerRequest",/* checkTokenValidityBody, */ deletePassengerRequest);
router.delete("/deleteDriverTravel",/* checkTokenValidityBody, */ deleteDriverTravel);

//Metodos implicado en el viaje en curso
router.patch("/updateUserLocationInTravel",/* checkTokenValidityBody, */ updateUserLocationInTravel);
router.get("/getTravelItinerary",/* checkTokenValidityQuery, */ getTravelItinerary);
router.put("/updateTravelItinerary",/* checkTokenValidityBody, */ updateTravelItinerary);
router.get("/getPassengerTravelItinerary",/* checkTokenValidityQuery, */ getPassengerTravelItinerary);

//Metodos implicados en el feedback
router.get("/getTravelPartners",/* checkTokenValidityQuery, */ getTravelPartners);
router.patch("/updateUserRanting",/* checkTokenValidityQuery, */ updateUserRanting);

/*Metodos transversales de todas las etapas*/
router.get("/getDetailsOfTravel",/* checkTokenValidityQuery, */ getDetailsOfTravel);
router.patch("/updateStateTravel",/* checkTokenValidityBody, */ updateStateTravel);
router.get("/getRouteCoordinates",/* checkTokenValidityQuery, */ getRouteCoordinates);
router.get("/getupcomingTravels/:userUID",getUpcomingTravels);

/*Metodos para el registro de conductores*/
router.post("/updateUsersDriverStatus", checkIsAuth, updateUserDriverStatus);

/*Metodos implicados en las notificaciones*/
router.post('/notifToPassengers',notifToPassengers)
router.post("/updateTokenFcm", checkIsAuth, upDateFcmToken)
router.post('/testFcm', fcmTest);

export default router;
