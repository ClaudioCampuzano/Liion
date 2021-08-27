import { db, auth, firebase } from "../config/config";

export const get_ = async (req, res) => {
  auth
    .createUser({
      email: "user@example.com",
      emailVerified: false,
      phoneNumber: "+11234567890",
      password: "123456",
      displayName: "John Doe",
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: false,
      customClaims: { roleId: 1 },
    })
    .then(() => {
      console.log("registrado");
    });

firebase    
    

  /*const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });*/
};

export const post_ = async (req, res) => {
  //collecion    elemento
  const docRef = db.collection("users").doc("dioses");
  //datos del elemento
  await docRef.set({
    nombre: "jairo",
    apellido: "moreno",
    nacio: "0",
  });
};

export const testRoute = async (req, res) => {
    res.json({msg:'ruta de prueba'})
    

};

export const delete_ = async (req, res) => {};

export const put_ = async (req, res) => {};
