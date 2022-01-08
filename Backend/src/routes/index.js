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
} from "../controllers/index";

import {
  checkIsAuth,
  checkTokenValidityBody,
  checkTokenValidityQuery,
} from "../middleware/guard";

const router = Router({ caseSensitive: true });
router.use("/protected", checkIsAuth);
router.post("/register", register);

router.post("/updateUsersDriverStatus", checkIsAuth, updateUserDriverStatus);
router.post("/updateDriverRating", checkIsAuth, updateDriverRating);
router.post("/updateUserRating", checkIsAuth, updateUserRating);

router.post("/createTravel", /* checkTokenValidityBody, */ createTravel);

router.get("/getUserData", /* checkTokenValidityQuery, */ getUserData);

//Checkea si el run ya esta registrado
router.get("/getStatusRun", getStatusRun);

//Metodos implicados en la busqueda de viajes
router.get("/getTravels", /* checkTokenValidityQuery, */ getTravels);
router.get(
  "/getDetailsOfTravel",
  /* checkTokenValidityQuery, */ getDetailsOfTravel
);
router.patch(
  "/updateSeenTravel",
  /* checkTokenValidityBody, */ updateSeenTravel
);
router.post(
  "/registerPassengerRequest",
  /* checkTokenValidityBody, */ registerPassengerRequest
);

//Metodos implicados en el listado de viajes de pasajero y conductor
router.get(
  "/getTravelsPassenger",
  /* checkTokenValidityQuery, */ getTravelsPassenger
);
router.get(
  "/getTravelsDriver",
  /* checkTokenValidityQuery, */ getTravelsDriver
);

//Metodos implicados en el managerTravel
router.delete(
  "/deletePassengerRequest",
  /* checkTokenValidityBody, */ deletePassengerRequest
);
router.delete(
  "/deleteDriverTravel",
  /* checkTokenValidityBody, */ deleteDriverTravel
);
router.patch(
  "/updateStateTravel",
  /* checkTokenValidityBody, */ updateStateTravel
);

export default router;
