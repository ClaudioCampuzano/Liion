import { db, auth, FieldValue, storage } from "../config/config";
import { isEmail, isLength, isDate, isEmpty } from "validator";
import { validateRun } from "../middleware/validations";
import { Buffer } from "buffer";

import moment from "moment";

export const register = async (req, res) => {
  const {
    name,
    lastname,
    run,
    email,
    birth,
    password,
    gender,
    isDriver,
    photo64,
  } = req.body;

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (
    !isEmpty(name) &&
    !isEmpty(lastname) &&
    !isEmpty(gender) &&
    validateRun(run) &&
    isEmail(email) &&
    isDate(birth) &&
    isLength(password, { min: 8 }) &&
    passwordRegex.test(password) &&
    !isDriver
  ) {
    try {
      const fireRes = await auth.createUser({
        email: email,
        emailVerified: false,
        password: password,
        disabled: false,
      });
      const uid = fireRes.toJSON().uid;
      try {
        var photoUpload = photo64 ?? "https://cutt.ly/SU2EnQW";

        if (photo64) {
          const imageBuffer = Buffer.from(photo64, "base64");

          const options = {
            metadata: {
              metadata: {
                firebaseStorageDownloadTokens: uid,
              },
              public: true,
              contentType: "image/jpeg",
            },
          };

          var file = storage.bucket().file("profile-images/" + uid + ".jpg");
          const resUpload = await file.save(imageBuffer, options);
          const signedUrl = (
            await file.getSignedUrl({
              action: "read",
              expires: "03-09-2491",
            })
          )[0];
          photoUpload = signedUrl;
        }

        const resFirestore = await db.collection("users").doc(uid).set({
          email: email,
          name: name,
          apellido: lastname,
          run: run,
          birth: birth,
          gender: gender,
          isDriver: isDriver,
          driverData: {},
          sRating: 0,
          nRating: 0,
          photo: photoUpload,
          status: "travelOff",
        });

        res.json({ message: "Successful Registration" });
      } catch (e) {
        auth
          .deleteUser(uid)
          .then(() => {
            console.log(e);
            res.status(400).json({ message: "Failed registration" });
          })
          .catch((error) => {
            console.log("Error deleting user:", error);
          });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  } else {
    res.status(400).json({ message: "Failed registration" });
  }
};

export const getUserData = async (req, res) => {
  const { uid } = JSON.parse(req.query["0"]);

  if (uid) {
    try {
      const q = await db.collection("users").doc(uid).get();
      const docExist = q.exists;
      if (docExist) {
        res.send(q.data());
      } else {
        res.status(404).send("User not found");
      }
    } catch (e) {
      console.log(e);
      res.status(403).send("Token UID Inválido");
    }
  } else {
    res.status(403).send("Token UID Inválido");
  }
};

export const updateUserDriverStatus = async (req, res) => {
  const { uid, flagDriver, driverData } = req.body;

  if (uid && flagDriver) {
    try {
      const q = await db
        .collection("users")
        .doc(uid)
        .update("isDriver", flagDriver, "driverData", driverData);
      //console.log(q)
      res.send("Actualización de Driver Status exitoso");
    } catch (e) {
      console.log(e);
      res.status(403).send("Token UID Inválido");
    }
  } else {
    res.status(403).send("Token UID Inválido o flagDriver inválido");
  }
};
export const updateDriverRating = async (req, res) => {
  let uid = req.body.uid;
  let rating = req.body.rating;
  if (uid && rating) {
    try {
      const q = await db
        .collection("users")
        .doc(uid)
        .update({
          "driverData.sRating": FieldValue.increment(rating),
          "driverData.nRating": FieldValue.increment(1),
        });

      //console.log(q)
      res.send("Puntuación de conductor exitosa");
    } catch (e) {
      console.log(e);
      res.status(403).send("Token UID Inválido");
    }
  } else {
    res.status(403).send("Token UID Inválido o Llamada inválida");
  }
};

export const updateUserRating = async (req, res) => {
  let uid = req.body.uid;
  let rating = req.body.rating;
  if (uid && rating) {
    try {
      const q = await db
        .collection("users")
        .doc(uid)
        .update({
          sRating: FieldValue.increment(rating),
          nRating: FieldValue.increment(1),
        });

      res.send("Puntuación de pasajero exitosa");
    } catch (e) {
      console.log(e);
      res.status(403).send("Token UID Inválido");
    }
  } else {
    res.status(403).send("Token UID Inválido o Llamada inválida");
  }
};

export const createTravel = async (req, res) => {
  const travelsTimes = [];
  var usefullTravelData = req.body;
  delete usefullTravelData.atoken;

  try {
    const docRef = db.collection("travels");
    const traveldoc = await docRef
      .where("driverUID", "==", usefullTravelData.driverUID)
      .get();
    traveldoc.forEach((x) => {
      travelsTimes.push([
        moment(x.data().date + " " + x.data().startTime, "DD/MM/YYYY HH:mm"),
        x.data().durationMinutes,
      ]);
    });
    let problems = false;
    let currentTimeTravelObject = moment(
      usefullTravelData.date + " " + usefullTravelData.startTime,
      "DD/MM/YYYY HH:mm"
    );

    let nextTimeTravelObject = currentTimeTravelObject.clone();
    nextTimeTravelObject.add(usefullTravelData.durationMinutes, "minutes");
    travelsTimes.forEach((x) => {
      let momentObej1 = x[0].clone();
      momentObej1.add(x[1], "minutes");
      if (
        currentTimeTravelObject.isBetween(x[0], momentObej1) ||
        nextTimeTravelObject.isBetween(x[0], momentObej1) ||
        currentTimeTravelObject.isSame(x[0])
      )
        problems = true;
    });

    if (problems)
      res.status(403).send("Ya tienes un viaje en ese rango de tiempo");
    else {
      const firestoreRes = await docRef.add(usefullTravelData);
      res.send("Viaje Creado exitosamente");
    }
  } catch (e) {
    console.log(e);
    res.status(403).send("Error");
  }
};

export const getTravels = async (req, res) => {
  const resultDataHard = [];
  const searchParams = JSON.parse(req.query["0"]);
  try {
    var fieldGender = ["allGender"];
    if (searchParams.genderApplicant === "Hombre") fieldGender.push("onlyMen");
    else if (searchParams.genderApplicant === "Mujer")
      fieldGender.push("onlyWoman");

    const docRef = db.collection("travels");
    const requestRef = db.collection("requestTravel");

    const snapshot = await docRef
      .where("nSeatsAvailable", ">", 0)
      .where("date", "==", searchParams.date)
      .where("localityDestination", "==", searchParams.localityDestination)
      .where("localityOrigin", "==", searchParams.localityOrigin)
      .where("status", "==", "open")
      .where("genderPreference", "in", fieldGender)
      .get();

    const initialSearchTime = moment(searchParams.time, "HH:mm");
    if (!snapshot.empty)
      for (const doc of snapshot.docs) {
        var userInTravel = false;
        for (var i = 0; i < doc.data().requestingPassengers.length; i++) {
          var requestObj = (
            await requestRef.doc(doc.data().requestingPassengers[i]).get()
          ).data();
          if (requestObj.passengerUID === searchParams.uid) {
            userInTravel = true;
            break;
          }
        }

        if (
          moment(doc.data().startTime, "HH:mm").isSameOrAfter(initialSearchTime)
        )
          if (!userInTravel) {
            var driverRef = await db
              .collection("users")
              .doc(doc.data().driverUID)
              .get();

            driverRef.exists &&
              doc.data().driverUID != searchParams.uid &&
              resultDataHard.push({
                id: doc.id,
                costPerSeat: doc.data().costPerSeat,
                extraBaggage: doc.data().extraBaggage,
                approvalIns: doc.data().approvalIns,
                smoking: doc.data().smoking,
                genderPreference: doc.data().genderPreference,
                nSeatsAvailable: doc.data().nSeatsAvailable,
                date: doc.data().date,
                startTime: doc.data().startTime,
                destinationDetails: doc.data().destinationDetails,
                originDetails: doc.data().originDetails,
                durationMinutes: doc.data().durationMinutes,
                nameDriver:
                  driverRef.data().name + " " + driverRef.data().apellido,
                driverPhoto: driverRef.data().photo,
                nRating: driverRef.data().driverData.nRating,
                sRating: driverRef.data().driverData.sRating,
              });
          }
      }
    const requiredParameters = JSON.stringify(resultDataHard);
    res.send(requiredParameters);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error");
  }
};

export const getDetailsOfTravel = async (req, res) => {
  const { travelId } = JSON.parse(req.query["0"]);

  try {
    var travelRef = await db.collection("travels").doc(travelId).get();
    var driverRef = await db
      .collection("users")
      .doc(travelRef.data().driverUID)
      .get();

    const objSend = {
      seen: travelRef.data().seen,
      routeCoordinates: travelRef.data().routeCoordinates,
      nSeatsOffered: travelRef.data().nSeatsOffered,
      usb: driverRef.data().driverData.usb,
      airConditioning: driverRef.data().driverData.airConditioning,
      carSeats: driverRef.data().driverData.carSeats,
      carColor: driverRef.data().driverData.carColor,
      typeVehicule: driverRef.data().driverData.typeVehicule,
      carPhoto: driverRef.data().driverData.carPhoto,
    };
    const requiredParameters = JSON.stringify(objSend);
    res.send(requiredParameters);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error");
  }
};

export const updateSeenTravel = async (req, res) => {
  var { travelId } = req.body;
  try {
    const travelRef = db.collection("travels").doc(travelId);
    const response = await travelRef.update({
      seen: FieldValue.increment(1),
    });
    res.json({ sucess: true });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error");
  }
};

export async function registerPassengerRequest(req, res) {
  const { travelId, passengerUID, extraBaggage, pickUp, dropOff, payMode } =
    req.body;
  try {
    const travelRef = db.collection("travels");
    const requestRef = db.collection("requestTravel");

    var bigBags = extraBaggage.bigBags ? -1 : 0;
    var personalItem = extraBaggage.personalItem ? -1 : 0;

    //Se comprueba si es posible agregar equipaje al viaje
    const travelObj = (await travelRef.doc(travelId).get()).data();
    if (
      (extraBaggage.bigBags && travelObj.extraBaggage.bigBags == 0) ||
      (extraBaggage.personalItem && travelObj.extraBaggage.personalItem == 0)
    ) {
      res
        .status(403)
        .json({ sucess: false, error: "Equipaje extra no disponible" });
      return;
    }

    //Se comprueba que no tiene ya una solicitud para ese viaje
    for (var i = 0; i < travelObj.requestingPassengers.length; i++) {
      var requestObj = (
        await requestRef.doc(travelObj.requestingPassengers[i]).get()
      ).data();
      if (requestObj.passengerUID === passengerUID) {
        res.status(403).json({
          sucess: false,
          error: "Ya tienes una solicitud en este viaje",
        });
        return;
      }
    }

    //Se comprueba que queden asientos disponibles
    if (travelObj.nSeatsAvailable <= 0) {
      res.status(403).json({
        sucess: false,
        error: "Se acabaron los asientos disponibles",
      });
      return;
    }

    //Se comprueba que el viaje no le calze en el horario de otro viaje ya inscrito
    const requestPassenger = await requestRef
      .where("passengerUID", "==", passengerUID)
      .where("status", "==", "accepted")
      .get();

    if (!requestPassenger.empty)
      for (const doc of requestPassenger.docs) {
        var travelsPassenger = await travelRef
          .where("requestingPassengers", "array-contains", doc.id)
          .where("status", "in", ["open", "ongoing"])
          .get();
        for (const docT of travelsPassenger.docs) {
          var timeTravel = moment(
            docT.data().date + " " + docT.data().startTime,
            "DD/MM/YYYY HH:mm"
          );
          var nextTimeTravel = timeTravel.clone();
          nextTimeTravel.add(docT.data().durationMinutes, "minutes");

          var timeTravelCreate = moment(
            travelObj.date + " " + travelObj.startTime,
            "DD/MM/YYYY HH:mm"
          );

          var nextTimeTravelCreate = timeTravelCreate.clone();
          nextTimeTravelCreate.add(travelObj.durationMinutes, "minutes");

          if (
            timeTravelCreate.isBetween(timeTravel, nextTimeTravel) ||
            nextTimeTravelCreate.isBetween(timeTravel, nextTimeTravel) ||
            timeTravelCreate.isSame(timeTravel)
          ) {
            res.status(403).json({
              sucess: false,
              error: "Ya tiene un viaje en este horario",
            });
            return;
          }
        }
      }

    //las solicitudes de viaje pueden estar, accepted, refused, pending
    //En esta mpv todas se registran como accepted
    const requestRes = await requestRef.add({
      passengerUID: passengerUID,
      extraBaggage: extraBaggage,
      pickUp: pickUp,
      dropOff: dropOff,
      payMode: payMode,
      travelId: travelId,
      status: "accepted",
    });

    //Como todos los viajes son aceptados automaticamente
    //Verificamos la cantidad de asientos disponibles, para cerrar el viaje
    var updateStatus = travelObj.nSeatsAvailable === 1 ? "closed" : "open";

    const travelRes = await travelRef.doc(travelId).update({
      requestingPassengers: FieldValue.arrayUnion(requestRes.id),
      "extraBaggage.bigBags": FieldValue.increment(bigBags),
      "extraBaggage.personalItem": FieldValue.increment(personalItem),
      nSeatsAvailable: FieldValue.increment(-1),
      status: updateStatus,
    });
    res.json({ sucess: true });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error");
  }
}

export async function getTravelsPassenger(req, res) {
  const { passengerUID } = JSON.parse(req.query["0"]);

  const resultData = [];
  try {
    var requestRef = await db
      .collection("requestTravel")
      .where("passengerUID", "==", passengerUID)
      .where("status", "=", "accepted")
      .get();

    if (!requestRef.empty)
      for (const doc of requestRef.docs) {
        var travelData = await db
          .collection("travels")
          .doc(doc.data().travelId)
          .get();

        if (travelData.exists) {
          var currentTimeTravel = moment(
            travelData.data().date + " " + travelData.data().startTime,
            "DD/MM/YYYY HH:mm"
          );
          if (
            currentTimeTravel
              .add(travelData.data().durationMinutes, "minutes")
              .add(6, "hours")
              .isSameOrAfter(moment()) ||
            travelData.data().status === "ongoing"
          ) {
            var driverRef = await db
              .collection("users")
              .doc(travelData.data().driverUID)
              .get();

            driverRef.exists &&
              resultData.push({
                id: travelData.id,
                requestId: doc.id,
                costPerSeat: travelData.data().costPerSeat,
                extraBaggage: travelData.data().extraBaggage,
                approvalIns: travelData.data().approvalIns,
                smoking: travelData.data().smoking,
                genderPreference: travelData.data().genderPreference,
                nSeatsAvailable: travelData.data().nSeatsAvailable,
                date: travelData.data().date,
                startTime: travelData.data().startTime,
                destinationDetails: travelData.data().destinationDetails,
                originDetails: travelData.data().originDetails,
                durationMinutes: travelData.data().durationMinutes,
                nameDriver:
                  driverRef.data().name + " " + driverRef.data().apellido,
                driverPhoto: driverRef.data().photo,
                nRating: driverRef.data().driverData.nRating,
                sRating: driverRef.data().driverData.sRating,
                status: travelData.data().status,
                statusRequest: doc.data().status,
              });
          }
        }
      }
    const requiredParameters = JSON.stringify(resultData);
    res.send(requiredParameters);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error");
  }
}

export async function getTravelsDriver(req, res) {
  const { driverUID } = JSON.parse(req.query["0"]);

  const resultData = [];
  try {
    var travelRef = await db
      .collection("travels")
      .where("driverUID", "==", driverUID)
      .where("status", "not-in", ["aborted"])
      .get();

    if (!travelRef.empty)
      for (const doc of travelRef.docs) {
        var currentTimeTravel = moment(
          doc.data().date + " " + doc.data().startTime,
          "DD/MM/YYYY HH:mm"
        );
        if (
          currentTimeTravel
            .add(doc.data().durationMinutes, "minutes")
            .add(6, "hours")
            .isSameOrAfter(moment()) ||
          doc.data().status === "ongoing"
        ) {
          resultData.push({
            id: doc.id,
            date: doc.data().date,
            startTime: doc.data().startTime,
            destinationDetails: doc.data().destinationDetails,
            originDetails: doc.data().originDetails,
            durationMinutes: doc.data().durationMinutes,
            status: doc.data().status,
            nSeatsAvailable: doc.data().nSeatsAvailable,
            nSeatsOffered: doc.data().nSeatsOffered,
            costPerSeat: doc.data().costPerSeat,
            extraBaggage: doc.data().extraBaggage,
            approvalIns: doc.data().approvalIns,
            smoking: doc.data().smoking,
            genderPreference: doc.data().genderPreference,
          });
        }
      }

    const requiredParameters = JSON.stringify(resultData);
    res.send(requiredParameters);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error");
  }
}

// Pasajero elimina reserva
export async function deletePassengerRequest(req, res) {
  const { travelId, requestId } = req.body;
  try {
    const requestRef = db.collection("requestTravel").doc(requestId);
    const requestObj = (await requestRef.get()).data();

    if (requestObj.status === "accepted") {
      const travelRef = db.collection("travels").doc(travelId);
      const travelObj = (await travelRef.get()).data();

      var bigBags = requestObj.bigBags ? -1 : 0;
      var personalItem = requestObj.personalItem ? -1 : 0;
      var updateStatus =
        travelObj.status === "closed" && travelObj.nSeatsAvailable === 0
          ? "open"
          : travelObj.status;

      const travelUpdate = await travelRef.update({
        requestingPassengers: FieldValue.arrayRemove(requestId),
        "extraBaggage.bigBags": FieldValue.increment(bigBags),
        "extraBaggage.personalItem": FieldValue.increment(personalItem),
        nSeatsAvailable: FieldValue.increment(1),
        status: updateStatus,
      });

      const requestUpdate = await requestRef.update({
        status: "unsubscribe",
      });

      res.json({ sucess: true, res: "Reserva cancelada" });
    } else {
      res.status(403).json({
        sucess: false,
        res: "Su reserva ya no se encuentra aceptada",
      });
    }
  } catch (e) {
    res.status(500).json({
      sucess: false,
      res: "Error",
    });
  }
}

// Conductor elimina viaje y con ellos cancela solicitudes
export async function deleteDriverTravel(req, res) {
  const { travelId } = req.body;
  try {
    const travelRef = db.collection("travels").doc(travelId);
    const travelObj = (await travelRef.get()).data();

    if (travelObj.status === "open" || travelObj.status === "closed") {
      const travelUpdate = await travelRef.update({
        status: "aborted",
      });

      const requestRef = db.collection("requestTravel");
      for (var i = 0; i < travelObj.requestingPassengers.length; i++) {
        const requestUpdate = await requestRef
          .doc(travelObj.requestingPassengers[i])
          .update({
            status: "rejected",
          });
      }

      res.json({ sucess: true, res: "Viaje cancelado" });
    } else {
      res.status(403).json({
        sucess: false,
        res: "Su viaje ya es imposible cancelarlo",
      });
    }
  } catch (e) {
    res.status(500).json({
      sucess: false,
      res: "Error",
    });
  }
}

export async function updateStateTravel(req, res) {
  const { travelId, state } = req.body;
  try {
    const travelRef = db.collection("travels").doc(travelId);
    const travelObj = (await travelRef.get()).data();

    // No se pueden iniciar viajes antes  de 15 minutos del mismo

    switch (state) {
      case "ongoing":
        var currentTimeTravel = moment(
          travelObj.date + " " + travelObj.startTime,
          "DD/MM/YYYY HH:mm"
        );

        if (
          currentTimeTravel.isBetween(
            moment().subtract(15, "minutes"),
            moment().add(15, "minutes")
          )
        ) {
          var objLocation = {};
          objLocation[travelObj.driverUID] = {};
          for (var i = 0; i < travelObj.requestingPassengers.length; i++) {
            const passengerUID = (
              await db
                .collection("requestTravel")
                .doc(travelObj.requestingPassengers[i])
                .get()
            ).data().passengerUID;
            const userUpdate = await db
              .collection("users")
              .doc(passengerUID)
              .update({
                status: "travelOn",
              });
            objLocation[passengerUID] = {};
          }

          const travelUpdate = await travelRef.update({
            status: state,
            locations: objLocation,
          });

          res.json({ sucess: true, res: "Viaje iniciado" });
        } else
          res.status(403).json({
            sucess: false,
            res: "Imposible iniciar viaje",
          });

        break;
      case "finished":
        if (travelObj.status === "ongoing") {
          const travelUpdate = await travelRef.update({
            status: state,
          });
          res.json({ sucess: true, res: "Viaje finalizado" });
        } else
          res.status(403).json({
            sucess: false,
            res: "Imposible finalizar sin haberlo iniciado",
          });
        break;
      default:
        res.status(403).json({
          sucess: false,
          res: "Estado no valido",
        });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      res: "Error",
    });
  }
}

export const getStatusRun = async (req, res) => {
  const { run } = JSON.parse(req.query["0"]);
  console.log(run);
  try {
    const userObj = await db.collection("users").where("run", "==", run).get();
    userObj.empty
      ? res.json({ check: false })
      : res.json({ check: true, res: "Run ya registrado" });
  } catch {
    res.status(500).json({
      sucess: false,
      res: "Error",
    });
  }
};

export async function updateUserLocationInTravel(req, res) {
  const { travelId, location, uid } = req.body;
  try {
    if ((isEmpty(travelId) || isEmpty(uid)) && location != null)
      throw "Faltan parametros";
    const updateObj = {};
    updateObj[`locations.${uid}`] = location;

    const travelRes = await db
      .collection("travels")
      .doc(travelId)
      .update(updateObj);
    res.json({ sucess: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      res: "Error",
    });
  }
}

export async function getRouteCoordinates(req, res) {
  try {
    const { travelId } = req.query;
    var travelRef = await db.collection("travels").doc(travelId).get();

    const objSend = JSON.stringify({
      routeCoordinates: travelRef.data().routeCoordinates,
    });

    res.status(200).send(objSend);
  } catch (e) {
    res.status(400).json({
      sucess: false,
    });
  }
}

export async function getTravelItinerary(req, res) {
  try {
    const { travelId } = req.query;
    const travelRef = db.collection("travels").doc(travelId);

    var travelData = (await travelRef.get()).data();
    if (travelData.status === "ongoing") {
      if (travelData.itinerary === undefined) {
        const objOrder = [];
        const requestDocs = await db
          .collection("requestTravel")
          .where("travelId", "==", travelId)
          .where("status", "==", "accepted")
          .get();
        const isCoordinateEqual = (object1, object2) => {
          return (
            object1.latitude === object2.latitude &&
            object1.longitude === object2.longitude
          );
        };
        //El itinerario tiene 3 estados, active, deactivate, finished
        requestDocs.docs.map((doc) => {
          objOrder.push({
            step: travelData.routeCoordinates.findIndex((obj) =>
              isCoordinateEqual(doc.data().dropOff, obj)
            ),
            type: "dropOff",
            status: "deactivate",
            coordinate: doc.data().dropOff,
            passengerUID: doc.data().passengerUID,
            extraBaggage: doc.data().extraBaggage,
          });
          objOrder.push({
            step: travelData.routeCoordinates.findIndex((obj) =>
              isCoordinateEqual(doc.data().pickUp, obj)
            ),
            type: "pickUp",
            status: "deactivate",
            coordinate: doc.data().pickUp,
            passengerUID: doc.data().passengerUID,
            extraBaggage: doc.data().extraBaggage,
          });
        });

        objOrder
          .sort((a, b) => {
            if (a.step > b.step) return 1;
            if (a.step < b.step) return -1;
            return 0;
          })
          .map((obj, index) => {
            obj.step = index;
          });

        objOrder[0].status = "active";

        await travelRef.set({ itinerary: objOrder }, { merge: true });
        travelData = (await travelRef.get()).data();
      }

      const itinerary = travelData.itinerary.find(
        (obj) => obj.status === "active"
      );
      if (itinerary) {
        const userData = (
          await db.collection("users").doc(itinerary.passengerUID).get()
        ).data();

        const objSend = JSON.stringify({
          itinerary: {
            ...itinerary,
            photo: userData.photo,
            fullName: userData.name + " " + userData.apellido,
          },
        });
        res.status(200).send(objSend);
      } else res.status(200).json({ status: "finished" });
    } else
      res.status(403).json({
        sucess: false,
      });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      sucess: false,
    });
  }
}
export async function updateTravelItinerary(req, res) {
  try {
    const { travelId } = req.body;
    if (travelId === undefined) throw "Falta datos";

    res.json({ sucess: true });
  } catch (e) {
    res.status(400).json({
      sucess: false,
    });
  }
}
