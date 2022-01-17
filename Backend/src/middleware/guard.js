import { auth } from "../config/config";

//tarea para crack, pasar tanto el request en axios (front) por el body
//y recibirlo y analizarlo en el body y no en los headers, saludos rey
const checkTkn = (req) => {
  if (req.body.atoken) {
    return req.body.atoken;
  } else {
    return null;
  }
};

export const checkIsAuth = async (req, res, next) => {
  let Atkn = checkTkn(req);

  if (Atkn) {
    try {
      const res = await auth.verifyIdToken(Atkn);
      //el callback es una funcion que se ejecuta una vez pasado lo anterior
      //para nuestro caso es como un 'filtro' que filtra las llamadas
      next(); //woo dale crack con el callback!!
    } catch (e) {
      res.status(403).send("Token de Acceso Inválido o caducado");
    }
  } else {
    res.status(403).send("Envie Token UID");
  }
};

export const checkTokenValidityBody = async (req, res, next) => {
  var token = req.body.atoken ?? null;
  if (token)
    try {
      const res = await auth.verifyIdToken(token);
      next();
    } catch (e) {
      res.status(403).send("Token de Acceso Inválido o caducado");
    }
  else res.status(403).send("Envie Token UID");
};

export const checkTokenValidityQuery = async (req, res, next) => {
  var token = req.query.atoken ?? null;

  if (token)
    try {
      const res = await auth.verifyIdToken(token);
      next();
    } catch (e) {
      res.status(403).send("Token de Acceso Inválido o caducado");
    }
  else res.status(403).send("Envie Token UID");
};
