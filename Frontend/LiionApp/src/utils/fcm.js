import messaging from "@react-native-firebase/messaging";

export const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

 export const returnFcmToken = async () => {
     return await messaging().getToken();
 }

 