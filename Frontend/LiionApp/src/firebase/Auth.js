import { getAuth, signInWithEmailAndPassword, signOut } from "@firebase/auth";

//es mejor usar el watcher. Busca el usuario si esta en el objeto firebase
//lo uso a modo de esteo para comprobar cosas
export const isUserLoggedIn = async () => {
  const user = getAuth().currentUser;
  if (user) {
    return true;
  } else {
    return false;
  }
};

/* export const testfunc = async () => {
  const user = firebase.auth().currentUser;
  if (user) {
    const tkn = await user.getIdToken(true);
    console.log(tkn);
  } else {
    console.log("jiro");
  }
}; */
export const fireLogin = async (payload) => {
  try {
    const auth = getAuth();
    const res = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    return res;
  } catch (e) {
    return e;
  }
};

export const fireLogout = async () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error);
    });
};

export const recoverEmail = async (payload) => {
  try {
    const res = await auth().sendPasswordResetEmail(payload.email);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
