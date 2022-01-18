import { db, auth, FieldValue, storage, fcm } from "../config/config";
import { isEmail, isLength, isDate, isAlphanumeric, isEmpty } from "validator";

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
  const { uid } = req.query;

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
export const upDateFcmToken = async (req, res) => {
  const { uid, fcmToken } = req.body;
  //console.log(uid, fcmToken)
  if (uid && fcmToken) {
    try {
      const q = await db
        .collection("users")
        .doc(uid)
        .update("fcmToken", fcmToken);
      //console.log(q)
      res.send("Actualización de token FCM exitoso");
    } catch (e) {
      console.log(e);
      res.status(403).send("Token UID Inválido");
    }
  } else {
    console.log('aqui?')
    res.status(403).send("Token UID Inválido o error");
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
  const searchParams = req.query;
  const resultDataHard = [];
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
  const { travelId } = req.query;

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
  const { passengerUID } = req.query;

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
                carModel: driverRef.data().driverData.car,
                carPhoto: driverRef.data().driverData.carPhoto,
                plate: driverRef.data().driverData.plate,
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
  const { driverUID } = req.query;

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

    switch (state) {
      case "ongoing":
        var currentTimeTravel = moment(
          travelObj.date + " " + travelObj.startTime,
          "DD/MM/YYYY HH:mm"
        );

        if (
          currentTimeTravel.isBetween(
            moment().subtract(20, "minutes"),
            moment().add(20, "minutes")
          )
        ) {
          var objLocation = {};
          objLocation[travelObj.driverUID] = {};
          await Promise.all(
            travelObj.requestingPassengers.map(async (doc) => {
              var passengerUID = (
                await db.collection("requestTravel").doc(doc).get()
              ).data().passengerUID;
              objLocation[passengerUID] = {};
            })
          );

          //Generacion de itinerario

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
              step: travelObj.routeCoordinates.findIndex((obj) =>
                isCoordinateEqual(doc.data().dropOff, obj)
              ),
              type: "dropOff",
              status: "deactivate",
              coordinate: doc.data().dropOff,
              passengerUID: doc.data().passengerUID,
              extraBaggage: doc.data().extraBaggage,
            });
            objOrder.push({
              step: travelObj.routeCoordinates.findIndex((obj) =>
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

          await travelRef.update({
            status: state,
            locations: objLocation,
            itinerary: objOrder,
          });

          res.json({ sucess: true, res: "Viaje iniciado" });
        } else
          res.status(403).json({
            sucess: false,
            res: "Imposible iniciar aun el viaje",
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
  const { run } = req.query;
  try {
    const userObj = await db.collection("users").where("run", "==", run).get();
    userObj.empty
      ? res.status(200).json({ check: false })
      : res.status(200).json({ check: true, res: "Run ya registrado" });
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
    const travelData = (
      await db.collection("travels").doc(travelId).get()
    ).data();
    if (travelData.status === "ongoing") {
      const itinerary = travelData.itinerary.find(
        (obj) => obj.status === "active"
      );

      if (itinerary) {
        const userData = (
          await db.collection("users").doc(itinerary.passengerUID).get()
        ).data();

        var itineraryMarkers = travelData.itinerary
          .filter((doc) => {
            if (doc.status !== "finished") {
              return true;
            }
            return false;
          })
          .map(
            ({ passengerUID, extraBaggage, step, ...restParams }) => restParams
          );

        const objSend = JSON.stringify({
          ...itinerary,
          photo: userData.photo,
          fullName: userData.name + " " + userData.apellido,
          markerList: itineraryMarkers,
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
    const { travelId, step, type, data } = req.body;

    const travelRef = db.collection("travels").doc(travelId);
    const travelData = (await travelRef.get()).data();
    var itinerary = travelData.itinerary;

    if (type === "pickUp" || type === "dropOff") {
      var interruptor = true;
      if (type === "pickUp") {
        var dataArray = data.split("~-!-~");
        interruptor =
          dataArray.length === 2 &&
          travelId === dataArray[0] &&
          itinerary[step].passengerUID === dataArray[1];
      }
      if (interruptor) {
        itinerary[step].status = "finished";
        if (itinerary.length !== step + 1)
          itinerary[step + 1].status = "active";
        travelRef.update({
          itinerary: itinerary,
        });
        res.status(200).send(JSON.stringify({ status: true }));
        return;
      }
      res.status(200).send(JSON.stringify({ status: false }));
    } else {
      res.status(403).json({
        sucess: false,
      });
      return;
    }
  } catch (e) {
    res.status(400).json({
      sucess: false,
    });
  }
}

export async function getPassengerTravelItinerary(req, res) {
  try {
    const { travelId, uid: passengerUID } = req.query;

    const travelData = (
      await db.collection("travels").doc(travelId).get()
    ).data();

    var itineraryFilter = travelData.itinerary.filter((doc) => {
      if (doc.status !== "finished" && doc.passengerUID === passengerUID) {
        return true;
      }
      return false;
    });
    if (itineraryFilter.length > 0) {
      var itineraryMarkers = itineraryFilter.map(
        ({ passengerUID, extraBaggage, step, ...restParams }) => restParams
      );

      itineraryMarkers[0].status = "active";

      const objSend = JSON.stringify({
        ...itineraryFilter[0],
        markerList: itineraryMarkers,
      });

      res.status(200).send(objSend);
    } else res.status(200).json({ status: "finished" });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      sucess: false,
    });
  }
}

export const fcmTest = async (req, res) => {
  const registrationToken = 'd9HFMSlKSriLwRFkkLetAa:APA91bHcLUr3_5G4MQmdb9DjHk2qCCs-4us5VfojFDNZd8gx2gHy0kZAcqzIb4YTHWPmOgbKc0knCsEJ7gPO2mbO6GHCHH6YKQOfSsY2zbZlkDEIXfx33odCu3qQZTZGRcb3WASqw6dN';
  //const registrationToken = 'dJpJPKRiSb6MpTRdb4AzuL:APA91bHeWBHp91cp58uJSkQyQf-jEpuRSzxL5k0NDj7z9fbVhm40bydZUVrG3SC3T8Fn79og9cTjZrN-KYi6CgAP5CMdadOWg9WMTURy3O0V3izy7jKVq5lv0_29Dyrq5D6yx_FXR-sC';
  const message = {
    notification: {
      title: '850',
      body: '2:45'
    },
    android: {
      notification: {
        icon: 'stock_ticker_update',
        color: '#7e55c3'
      }
    },
    token: registrationToken
  };
  try {
    const resfcm = await fcm.send(message)
    console.log('Successfully sent message:', resfcm);
    res.json({ sucess: true, res: resfcm });
  }
  catch (e) {
    console.log('Error sending message:', e);
    res.status(500).json({
      sucess: false,
      res: e,
    });
  }

}

function compareDateOfTravels(a, b) {
  const aTime = moment(a.date + " " + a.startTime, "DD/MM/YYYY HH:mm")
  const bTime = moment(b.date + " " + b.startTime, "DD/MM/YYYY HH:mm")
  //console.log(aTime, bTime)
  if (aTime.isSameOrBefore(bTime)) {
    return -1;
  }
  if (aTime.isAfter(bTime)) {
    return 1;
  }
  return 0;
}



export async function getupcomingTravels(req, res) {
  var driverUID = req.params.userUID;
  const resultData = [];
  try {
    var travelRef = await db
      .collection("travels")
      .where("driverUID", "==", driverUID)
      .where("status", "not-in", ["finished", "aborted"])
      .get();

    if (!travelRef.empty)
      //travelRef.docs.forEach(x => console.log(compareDateOfTravels(x.data(),x.data())))
      for (const doc of travelRef.docs) {
        let currentTimeTravel = moment(
          doc.data().date + " " + doc.data().startTime,
          "DD/MM/YYYY HH:mm"
        );
        if (
          currentTimeTravel
            .add(doc.data().durationMinutes, "minutes")
            .add(6, "hours")
            .isSameOrAfter(moment())
          //          && doc.data().status !== 'ongoing' //enrelidad si queremos los ongoing
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
    //const onGoing = []
    if (typeof resultData !== 'undefined' && resultData.length > 0) {
      //resultData.forEach(x => {
      //  if (x.status === 'ongoing') onGoing.push(x)
      //})
      //resultData.filter(x => x.status !== 'ongoing')
      //onGoing.sort(compareDateOfTravels)
      resultData.sort(compareDateOfTravels)
    } else throw "Vacio" //no registra viaje alguno

    const currentTime = moment()
    const closeTime = moment(resultData[0].date + " " + resultData[0].startTime, "DD/MM/YYYY HH:mm")
    const diff = moment.duration(closeTime.diff(currentTime))
    const minuteDelta = diff.asMinutes()
    //console.log(currentTime, closeTime, minuteDelta)
    if (Math.abs(minuteDelta) <= 20) { //viaje en 20 minutos
      //nunca deberian solaparse viajes, y se asume que no va suceder
      //viajes de prueba: qFVOwm2EuliVAU3YrEit y ZNEvihK4ZAF3USh6BCOd
      const theTravel = resultData[0]
      const travelId = theTravel.id
      if (theTravel.status === "open") {
        theTravel.status = 'closed'
        const q = await db
          .collection("travels")
          .doc(travelId)
          .update("status", 'closed');
      }
      res.send(JSON.stringify({ sucess: true, res: theTravel }));
    }
    else {
      //no hay viejs pronto
      res.send(JSON.stringify({ sucess: false, res: [] }))
    }

  } catch (e) {
    console.log(e);
    res.status(500).send({ sucess: false, res: "Ops hubo un error" });
  }
}

export const notifToPassengers = async (req, res) => {
  const { travelId } = req.body;
  if (!travelId) {
    res.status(400).send({ sucess: false, res: "Envie un id de viaje" });
  }
  else {
    try {
      const docRef = await db.collection("travels").doc(travelId).get();
      const docExist = docRef.exists;
      if (!docExist) {
        res.status(400).send({ sucess: false, res: "No se encuetra viaje" });
      }
      const { requestingPassengers } = docRef.data()
      if (typeof requestingPassengers !== 'undefined' && requestingPassengers.length > 0) {
        const userIds = []
        await Promise.all(
          requestingPassengers.map(async (passenger) => {
            let trimmed = passenger.trim()
            const travelRequestRef = await db.collection("requestTravel").doc(trimmed).get()
            const { passengerUID } = travelRequestRef.data()
            userIds.push(passengerUID)
          })
        )
        if (typeof userIds !== 'undefined' && userIds.length > 0) {
          const userIdWithFcm = []
          await Promise.all(
            userIds.map(async (user) => {
              let trimmed2 = user.trim()
              const usersRefs = await db.collection("users").doc(trimmed2).get()
              const { fcmToken, name, apellido } = usersRefs.data()
              userIdWithFcm.push({ uid: trimmed2, fcmToken: fcmToken, name: name, apellido: apellido })
            })
          )

          if (typeof userIdWithFcm !== 'undefined' && userIdWithFcm.length > 0) {
            //hasta aca.. ok
            const fcmTokenArr = []
            userIdWithFcm.forEach(x => fcmTokenArr.push(x.fcmToken))
            let travelers = []
            userIdWithFcm.forEach(x => travelers.push(x.name + ' ', x.apellido))
            const msg = {
              msg: 'Preparate a viajar con: ' + JSON.stringify(travelers),
              for: "passengers"
            }
            const message = {
              notification: {
                title: 'Tu viaje Esta por empezar',
                body: 'Preparate a viajar con: ' + JSON.stringify(travelers),
              },
              data:{
                userFor:'passengers'
              },
              android: {
                notification: {
                  icon: 'stock_ticker_update',
                  color: '#009999'
                }
              },
              tokens: fcmTokenArr
            };
            try {
              const resfcm = await fcm.sendMulticast(message)
              if (resfcm.failureCount > 0) {
                const failedTokens = [];
                resfcm.responses.forEach((resp, idx) => {
                  if (!resp.success) {
                    failedTokens.push(fcmTokenArr[idx]);
                  }
                });
                console.log('List of tokens that caused failures: ' + failedTokens);
              }
              res.json({ sucess: true, res: resfcm });
            }
            catch (e) {
              console.log('Error sending message:', e);
              res.status(500).json({
                sucess: false,
                res: e,
              });
            }
          }
          else {
            res.status(400).send({ sucess: false, res: "No se encuetran id de viajeros" })
          }
        }
        else {
          res.status(400).send({ sucess: false, res: "No se encuetran id de viajeros" });
        }
      }
      else {
        res.status(400).send({ sucess: false, res: "No se encuetran pasajeros para enviar su notificacion" });
      }
    }
    catch (e) {
      console.log(e)
      res.status(400).send({ sucess: false, res: "Oops ha ocurrido un error" });
    }
  }
}

