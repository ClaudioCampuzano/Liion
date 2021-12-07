import { db, auth, FieldValue } from "../config/config";
import { isEmail, isLength, isDate, isAlphanumeric, isEmpty } from "validator";
import { validateRun } from "../middleware/validations";
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
    isPassenger,
    isDriver,
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
    isPassenger &&
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
        const docRef = db.collection("users").doc(uid);
        const firestoreRes = await docRef.set({
          email: email,
          name: name,
          apellido: lastname,
          run: run,
          birth: birth,
          gender: gender,
          isPassenger: isPassenger,
          isDriver: isDriver,
          driverData: {},
          sRating: 0,
          nRating: 0,
        });
        res.json({ message: "Successful Registration" });
      } catch (e) {
        auth
          .deleteUser(uid)
          .then(() => {
            console.log('"Failed save in Firestore auth user removed');
          })
          .catch((error) => {
            console.log("Error deleting user:", error);
          });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    const msg = "Failed registration";
    res.status(400).json({ message: msg });
  }
};

export const getUserData = async (req, res) => {
  let uid = req.body.uid;

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
  let uid = req.body.uid;
  let flagDriver = req.body.flagDriver;
  if (uid && flagDriver) {
    try {
      const driverData = {
        car: "Tesla Model S",
        carcolor: "Gris",
        carSeats: 4,
        plate: "DLJR01",
        url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/compositor-1623493959.jpg?crop=0.628xw:0.628xh;0.190xw,0.222xh&resize=980:*",
        sRating: 0,
        nRating: 0,
      };
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
      // db.FieldValue.increment(50)
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
      // db.FieldValue.increment(50)
      const q = await db
        .collection("users")
        .doc(uid)
        .update({
          sRating: FieldValue.increment(rating),
          nRating: FieldValue.increment(1),
        });

      //console.log(q)
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
  //testing modal only
  //res.status(403).send("Error");

  const travelsTimes = [];
  const usefullTravelData = (({ driverData, travelData, driverUID }) => ({
    driverUID,
    driverData,
    travelData,
  }))(req.body);
  //console.log(usefullTravelData)
  try {
    //console.log(usefullTravelData.driverUID)
    const docRef = db.collection("travels");
    const traveldoc = await docRef
      .where("driverUID", "==", usefullTravelData.driverUID)
      .get();
    traveldoc.forEach((x) => {
      //travelsTimes.push([x.data().travelData.date, x.data().travelData.time, x.data().travelData.duration])
      travelsTimes.push([
        moment(
          x.data().travelData.date + " " + x.data().travelData.time,
          "DD/MM/YYYY HH:mm"
        ),
        x.data().travelData.duration,
      ]);
    });
    //console.log(travelsTimes)
    let problems = false;
    let currentTimeTravelObject = moment(
      usefullTravelData.travelData.date +
        " " +
        usefullTravelData.travelData.time,
      "DD/MM/YYYY HH:mm"
    );
    let nextTimeTravelObject = currentTimeTravelObject.clone();
    nextTimeTravelObject.add(usefullTravelData.travelData.duration, "minutes");
    travelsTimes.forEach((x) => {
      let momentObej1 = x[0].clone();
      momentObej1.add(x[1], "minutes");
      if (
        currentTimeTravelObject.isBetween(x[0], momentObej1) ||
        nextTimeTravelObject.isBetween(x[0], momentObej1)
      ) {
        problems = true;
      }
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

  const {addresses, date,time} = req.body

  //
  const resultDataHard = [
    {
      id: 1,
      driverData: {
        photo:
          "https://ih1.redbubble.net/image.1073432688.1614/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg",
        nameConductor: "Carlos Elgueta",
        nRating: 14,
        sRating: 50,
      },

      travelData: {
        bigBags: 0,
        personalItem: 0,

        onlyMen: false,
        views: 0,
        onlyWoman: true,
        allGender: false,
        smoking: true,
        approvalIns: false,
        price: 3000,
        seatsAvaliable: 2,
        date: "20/11/2021",
        time: "22:43",
        duration: 10.7833333,
        addresses: {
          origin: "Badajoz, Las Condes",
          destination: "Villa Alemana, Valparaiso",
        },
        coordinates: [
          {
            latitude: -33.04526,
            longitude: -71.40015,
          },
          {
            latitude: -33.04531,
            longitude: -71.40009,
          },
          {
            latitude: -33.04581,
            longitude: -71.40012,
          },
          {
            latitude: -33.04582,
            longitude: -71.40027,
          },
          {
            latitude: -33.04589,
            longitude: -71.40107,
          },
          {
            latitude: -33.04711,
            longitude: -71.4012,
          },
          {
            latitude: -33.04741,
            longitude: -71.40121,
          },
          {
            latitude: -33.04812,
            longitude: -71.40126,
          },
          {
            latitude: -33.04805,
            longitude: -71.3999,
          },
          {
            latitude: -33.04919,
            longitude: -71.39999,
          },
        ],
      },
    },
    {
      id: 0,
      driverData: {
        photo:
          "https://ih1.redbubble.net/image.1073432688.1614/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg",
        nameConductor: "Luis Araya",
        nRating: 10,
        sRating: 50,
        carcolor: "Gris",
        typeVehicule: "SUV",
        car: "Tesla Model S",
        plate: "DLJR01",
        usb: true,
        airConditioning: true,
        nPassengerSeats: 5,
      },

      travelData: {
        nOfSeats: 3,
        seatsAvaliable: 1,

        bigBags: 0,
        personalItem: 1,
        onlyMen: false,
        onlyWoman: false,
        allGender: true,
        smoking: false,
        approvalIns: false,
        price: 5000,
        views: 0,
        date: "20/11/2021",
        time: "12:43",
        duration: 85.7833333,
        addresses: {
          origin: "Badajoz, Las Condes",
          destination: "San Fernando, Rancagua",
        },
        coordinates: [
          {
            latitude: -33.04526,
            longitude: -71.40015,
          },
          {
            latitude: -33.04531,
            longitude: -71.40009,
          },
          {
            latitude: -33.04581,
            longitude: -71.40012,
          },
          {
            latitude: -33.04582,
            longitude: -71.40027,
          },
          {
            latitude: -33.04589,
            longitude: -71.40107,
          },
          {
            latitude: -33.04711,
            longitude: -71.4012,
          },
          {
            latitude: -33.04741,
            longitude: -71.40121,
          },
          {
            latitude: -33.04812,
            longitude: -71.40126,
          },
          {
            latitude: -33.04805,
            longitude: -71.3999,
          },
          {
            latitude: -33.04919,
            longitude: -71.39999,
          },
        ],
      },
    },
    {
      id: 2,

      driverData: {
        photo:
          "https://ih1.redbubble.net/image.1073432688.1614/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg",
        nameConductor: "Claudio Campuzano",
        nRating: 28,
        sRating: 50,
        carcolor: "Gris",
        typeVehicule: "Sedan",
        car: "Tesla Model S",
        plate: "DLJR01",
        usb: false,
        airConditioning: false,
        nPassengerSeats: 5,
      },

      travelData: {
        bigBags: 0,
        personalItem: 0,
        views: 5,
        nOfSeats: 3,
        seatsAvaliable: 3,

        onlyMen: true,
        onlyWoman: false,
        allGender: false,
        smoking: true,
        approvalIns: false,
        price: 2000,
        date: "20/11/2021",
        time: "15:43",
        duration: 35.7833333,
        addresses: {
          origin: "Badajoz, Las Condes",
          destination: "Quilpue, Valparaiso",
        },
        coordinates: [
          {
            latitude: -33.04526,
            longitude: -71.40015,
          },
          {
            latitude: -33.04531,
            longitude: -71.40009,
          },
          {
            latitude: -33.04581,
            longitude: -71.40012,
          },
          {
            latitude: -33.04582,
            longitude: -71.40027,
          },
          {
            latitude: -33.04589,
            longitude: -71.40107,
          },
          {
            latitude: -33.04711,
            longitude: -71.4012,
          },
          {
            latitude: -33.04741,
            longitude: -71.40121,
          },
          {
            latitude: -33.04812,
            longitude: -71.40126,
          },
          {
            latitude: -33.04805,
            longitude: -71.3999,
          },
          {
            latitude: -33.04919,
            longitude: -71.39999,
          },
        ],
      },
    },
    {
      id: 3,

      driverData: {
        photo:
          "https://ih1.redbubble.net/image.1073432688.1614/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg",
        nameConductor: "Bryan Rosales",
        nRating: 20,
        sRating: 50,
        carcolor: "Gris",
        car: "Tesla Model S",
        plate: "DLJR01",
      },

      travelData: {
        bigBags: 0,
        views: 9,

        personalItem: 0,
        onlyMen: false,
        onlyWoman: true,
        allGender: false,
        smoking: false,
        approvalIns: true,
        price: 1000,
        seatsAvaliable: 5,
        date: "20/11/2022",
        time: "10:43",
        duration: 20.7833333,
        addresses: {
          origin: "Badajoz, Las Condes",
          destination: "Vallenar, Atacama",
        },
        coordinates: [
          {
            latitude: -33.04526,
            longitude: -71.40015,
          },
          {
            latitude: -33.04531,
            longitude: -71.40009,
          },
          {
            latitude: -33.04581,
            longitude: -71.40012,
          },
          {
            latitude: -33.04582,
            longitude: -71.40027,
          },
          {
            latitude: -33.04589,
            longitude: -71.40107,
          },
          {
            latitude: -33.04711,
            longitude: -71.4012,
          },
          {
            latitude: -33.04741,
            longitude: -71.40121,
          },
          {
            latitude: -33.04812,
            longitude: -71.40126,
          },
          {
            latitude: -33.04805,
            longitude: -71.3999,
          },
          {
            latitude: -33.04919,
            longitude: -71.39999,
          },
        ],
      },
    },
  ];

  const requiredParameters = JSON.stringify(resultDataHard);


  res.send(requiredParameters);

}