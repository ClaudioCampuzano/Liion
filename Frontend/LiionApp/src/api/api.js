import axios from "axios";
import firebase from "firebase";

const client = axios.create({
  baseURL: "http://192.168.0.5:3000",
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
      console.log(res.data);
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
    console.log(res.data);
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
      timeout: 2000,
    });
    return [true, res.data.message];
  } catch (e) {
    try {
      console.log(e.response.data.message)
      return [false,e.response.data.message]
    } catch (eS) {
      console.log(e)
      return [false,e]
    }
  }
};
