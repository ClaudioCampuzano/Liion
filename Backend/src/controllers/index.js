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


export const register = async (req, res) => {
  //console.log(req.body)
  const { name, lastname, run, email, password, isPassenger, isDriver} = req.body
  if (name && lastname && run && email && password && isPassenger && isDriver){
    try {
      const Fireres = await auth.createUser({
        email: email,
        emailVerified: false,
        password: password,
        disabled: false,
      })
      //res.json({message:"Registro Exitoso"})
      console.log(Fireres.toJSON())
      const uid = Fireres.toJSON().uid
      
      
      //console.log(uid)
      //unico bug, si pasa el auth, pero no la escritura en firestore, en tal caso
      //deberiamos anidar otro trycatch y en su try devolver todo ok
      //y en su catch eliminar al usuario con la id UID (DALE CRACK)
        const docRef = db.collection("users").doc(uid);
        const rescreate = await docRef.set({
          email:email,
          name:name,
          apellido: lastname,
          run:run,
          isPassenger:isPassenger,
          isDriver:isDriver,
          DriverData:{},
        });



     res.json({message:'registro exitoso'})
     console.log(rescreate)

      



    }
    catch(e) {
      console.log(e);
      res.status(500).json(e);
      //console.log('err')
    }
  }
  else {
    
    const msg = "Debe ingresar nombre, apellido, run, email y password (DEV: agregar bool si isPassenger e isDriver)"
    console.log(msg)
    res.status(400).json({msg:msg})
  }

 
};