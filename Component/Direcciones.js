import React from "react";
import MapViewDirections from "react-native-maps-directions";

export default function Directions ({ destination, origin, onReady }) {
  return (<MapViewDirections
      destination={destination}
      origin={origin}
      onReady={onReady}
      apikey="AIzaSyBrFrKvwcUqEmfileiqIA0cOiMg6tDrG84"
      strokeWidth={3}
      strokeColor="#222"
  />)
}


