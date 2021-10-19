import axios from "axios";
import firebase from "firebase";

const client = axios.create({
  baseURL: "http://192.168.1.2:3000",
  timeout: 2000,
});

export const protectedRoute = async () => {
  //esto se debe agregar al flux de crack (mutaciones, acciones, state etcetc y luego pedir desde ahi, aunsuqe
  //no es estrictamente nescesario ya que ese encuentra en el bojeto user que ya se guarda en el asyncstorage
  const user = firebase.auth().currentUser;
  if (user) {
    const tkn = await user.getIdToken(true);

    try {
      //prueba cambiando tkn por algun string y veras
      const res = await client({
        method: "post",
        url: "/protected",
        headers: {
          token: tkn,
        },
      });
      
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("jiro");
  }
};

export const unProtectedRoute = async () => {
  try {
    const res = await client({
      method: "post",
      url: "/unprotected",
      headers: {
        token: "fakeToken",
      },
    });
    
  } catch (e) {
    console.log(e.response);
  }
};

export const RegisterBackend = async (payload) => {
  const payloadStr = JSON.stringify(payload);
  try {
    const res = await client({
      method: "post",
      url: "/register",
      headers: { "Content-Type": "application/json" },
      data: payloadStr,
    });
    return [true, res.data.message];
  } catch (e) {
    try {
      
      return [false, e.response.data.message];
    } catch (eS) {
      
      return [false, e];
    }
  }
};

export const retrieveUserDataFromApi = async (user) => {
  try {
    const atoken = await user.getIdToken(true);
    const uid = await user.uid;
    const data = JSON.stringify({ uid: uid, atoken: atoken });
    const res = await client({
      method: "post",
      url: "/getuserdata",
      headers: { "Content-Type": "application/json" },
      data: data,
    });
    
    return [true, res.data];
  } catch (e) {
    
    return [false, e];
  }
};

export const updateDriverStatus = async (flag, payload) => {
  try {
    const obj = {...payload, ...{flagDriver:flag}}
    const dataSend = JSON.stringify(obj)
    //console.log(dataSend)
    const res = await client({
      method: "post",
      url: "/updateusersdriverstatus",
      headers: { "Content-Type": "application/json" },
      data: dataSend,
    });
    return [true, res.data];

  }catch(e){
    //console.log(e.response.data)
    return [false, e.response.data];
  }
}
