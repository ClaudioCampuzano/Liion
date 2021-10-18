import { db, auth, FieldValue } from "../config/config";
import { isEmail, isLength, isDate, isAlphanumeric, isEmpty } from "validator";
import { validateRun } from "../middleware/validations";


export const register = async (req, res) => {
  const { name, lastname, run, email, birth, password, isPassenger, isDriver } =
    req.body;
  if (
    !isEmpty(name) &&
    !isEmpty(lastname) &&
    validateRun(run) &&
    isEmail(email) &&
    isDate(birth) &&
    isLength(password, { min: 8 }) &&
    isAlphanumeric(password, "es-ES") &&
    isPassenger &&
    isDriver
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
          isPassenger: isPassenger,
          isDriver: isDriver,
          DriverData: {},
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
      res.status(403).send("Token UID Inválido2");
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
        plate: "DLJR01",
        url: "https://cdn.folhape.com.br/upload/dn_arquivo/2021/06/tesla-model-s-2_1.png",
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
      res.status(403).send("Token UID Inválido2");
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
        .update( 
          {"driverData.sRating":FieldValue.increment(rating), "driverData.nRating":FieldValue.increment(1)}
        );
        
      //console.log(q)
      res.send("Puntuación de conductor exitosa");
    } catch (e) {
      console.log(e);
      res.status(403).send("Token UID Inválido2");
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
        .update( 
          {"sRating":FieldValue.increment(rating), "nRating":FieldValue.increment(1)}
        );
        
      //console.log(q)
      res.send("Puntuación de pasajero exitosa");
    } catch (e) {
      console.log(e);
      res.status(403).send("Token UID Inválido2");
    }
  } else {
    res.status(403).send("Token UID Inválido o Llamada inválida");
  }
};