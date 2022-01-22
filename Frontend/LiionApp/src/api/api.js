import axios from "axios";
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

export const getUserData = async (user) => {
  try {
    const data = { uid: await user.uid, atoken: await user.getIdToken(true) };
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
    const res = await client({
      method: "post",
      url: "/updateUsersDriverStatus",
      headers: { "Content-Type": "application/json" },
      data: dataSend,
    });
    return [true, res.data];
  } catch (e) {
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
    return [false, e.response.data];
  }
};

export const getDetailsOfTravel = async (payload) => {
  try {
    const requiredParameters = { travelId: payload };

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

export const getTravels = async (searchParameters) => {
  const { data } = await client({
    method: "get",
    url: "/getTravels",
    params: searchParameters,
  });
  return data;
};

export const getStatusRun = async (payload) => {
  const { data } = await client({
    method: "get",
    url: "/getStatusRun",
    params: payload,
  });
  return data;
};

export const getTravelPartners = async (payload) => {
  const { data } = await client({
    method: "get",
    url: "/getTravelPartners",
    params: payload,
  });
  return data;
};

export const updateUserRanting = async (payload) => {
  const { data } = await client({
    method: "patch",
    url: "/updateUserRanting",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(payload),
  });
  return data;
};

export const updateFcmToken = async (payload) => {
  try {
    const dataSend = JSON.stringify(payload);
    //console.log(dataSend)
    const res = await client({
      method: "patch",
      url: "/updateTokenFcm",
      headers: { "Content-Type": "application/json" },
      data: dataSend,
    });
    return [true, res.data];
  } catch (e) {
    return [false, e.response.data];
  }
};

export const getUpcomingTravels = async (payload) => {
  try {
    const { data } = await client({
      method: "get",
      url: "/getUpcomingTravels",
      params: payload,
    });
    return [true, data];
  } catch (e) {
    return [false, e];
  }
};

export const notifToPassengers = async (travelId) => {
  try {
    const { data } = await client({
      method: "post",
      url: "/notifToPassengers",
      headers: { "Content-Type": "application/json" },
      data: {
        travelId: travelId,
      },
    });
    return [true, data];
  } catch (e) {
    return [false, e.response.data];
  }
};
