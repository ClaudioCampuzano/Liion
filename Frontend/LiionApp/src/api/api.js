import axios from "axios";
import firebase from "firebase/compat/app";
import { BACKEND_URL } from "@env";

const client = axios.create({
  baseURL: "http://" + BACKEND_URL + ":3000",
});

export const registerBackend = async (payload) => {
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
      method: "get",
      url: "/getUserData",
      params: data,
    });
    return [true, res.data];
  } catch (e) {
    return [false, e];
  }
};

export const updateDriverStatus = async (flag, payload) => {
  try {
    const obj = { ...payload, ...{ flagDriver: flag } };
    const dataSend = JSON.stringify(obj);
    //console.log(dataSend)
    const res = await client({
      method: "post",
      url: "/updateUsersDriverStatus",
      headers: { "Content-Type": "application/json" },
      data: dataSend,
    });
    return [true, res.data];
  } catch (e) {
    //console.log(e.response.data)
    return [false, e.response.data];
  }
};

export const createTravel = async (dataTravel) => {
  try {
    const dataSend = JSON.stringify(dataTravel);
    const res = await client({
      method: "post",
      url: "/createTravel",
      headers: { "Content-Type": "application/json" },
      data: dataSend,
    });
    return [true, res.data];
  } catch (e) {
    //console.log(e.response.data)
    return [false, e.response.data];
  }
};

export const getTravels = async (searchParameters) => {
  try {
    const requiredParameters = JSON.stringify(searchParameters);
    const res = await client({
      method: "get",
      url: "/getTravels",
      params: requiredParameters,
    });
    return [true, res.data];
  } catch (e) {
    return [false, e.response.data];
  }
};

export const getStatusRun = async (payload) => {
  const { data } = await client({
    method: "get",
    url: "/getStatusRun",
    params: payload,
  });
  return data;
};

export const getDetailsOfTravel = async (payload) => {
  try {
    const requiredParameters = JSON.stringify({ travelId: payload });

    const res = await client({
      method: "get",
      url: "/getDetailsOfTravel",
      params: requiredParameters,
    });

    return [true, res.data];
  } catch (e) {
    return [false, e.response.data];
  }
};

export const updateSeenTravel = async (travelId) => {
  try {
    const requiredParameters = JSON.stringify(travelId);
    const res = await client({
      method: "patch",
      url: "/updateSeenTravel",
      headers: { "Content-Type": "application/json" },
      data: requiredParameters,
    });
    return [true, res.data];
  } catch (e) {
    return [false, e.response.data];
  }
};

export const updateStateTravel = async (data) => {
  try {
    const requiredParameters = JSON.stringify(data);
    const res = await client({
      method: "patch",
      url: "/updateStateTravel",
      headers: { "Content-Type": "application/json" },
      data: requiredParameters,
    });
    return [true, res.data];
  } catch (e) {
    return [false, e.response.data];
  }
};

export const registerPassengerRequest = async (payload) => {
  try {
    const requiredParameters = JSON.stringify(payload);
    const res = await client({
      method: "post",
      url: "/registerPassengerRequest",
      headers: { "Content-Type": "application/json" },
      data: requiredParameters,
    });
    return [true, res.data];
  } catch (e) {
    return [false, e.response.data];
  }
};

export const deletePassengerRequest = async (payload) => {
  try {
    const requiredParameters = JSON.stringify(payload);
    const res = await client({
      method: "delete",
      url: "/deletePassengerRequest",
      headers: { "Content-Type": "application/json" },
      data: requiredParameters,
    });
    return [true, res.data];
  } catch (e) {
    return [false, e.response.data];
  }
};

export const deleteDriverTravel = async (payload) => {
  try {
    const requiredParameters = JSON.stringify(payload);
    const res = await client({
      method: "delete",
      url: "/deleteDriverTravel",
      headers: { "Content-Type": "application/json" },
      data: requiredParameters,
    });
    return [true, res.data];
  } catch (e) {
    return [false, e.response.data];
  }
};

export const getTravelsPassenger = async (payload) => {
  const { data } = await client({
    method: "get",
    url: "/getTravelsPassenger",
    params: payload,
  });
  return data;
};

export const getTravelsDriver = async (payload) => {
  const { data } = await client({
    method: "get",
    url: "/getTravelsDriver",
    params: payload,
  });
  return data;
};

export const getRouteCoordinates = async (payload) => {
  const { data } = await client({
    method: "get",
    url: "/getRouteCoordinates",
    params: payload,
  });
  return data;
};

export const getTravelItinerary = async (payload) => {
  const { data } = await client({
    method: "get",
    url: "/getTravelItinerary",
    params: payload,
  });
  return data;
};

export const getPassengerTravelItinerary = async (payload) => {
  const { data } = await client({
    method: "get",
    url: "/getPassengerTravelItinerary",
    params: payload,
  });
  return data;
};

export const updateTravelItinerary = async (payload) => {
  const { data } = await client({
    method: "put",
    url: "/updateTravelItinerary",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(payload),
  });
  return data;
};

export const updateUserLocationInTravel = async (pyload) => {
  const { data } = await client({
    method: "patch",
    url: "/updateUserLocationInTravel",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(pyload),
  });
  return data;
};
