import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS, hp, wp } from "../constants/styleThemes";

const MapOngoingTravel = (props) => {
  const {
    dimensions,
    coordinateList,
    origin,
    destiny,
    navigation,
    typePassenger,
    markers,
    ...restOfProps
  } = props;
  const mapRef = useRef();

  const [region, setRegion] = useState(() => {
    return {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    };
  });

  const centeredRegion = () => {
    var centerRegion = { ...region };

    centerRegion.longitude = (origin.longitude + destiny.longitude) / 2;
    centerRegion.latitude = (origin.latitude + destiny.latitude) / 2;

    centerRegion.longitudeDelta =
      1.2 * Math.abs(Math.abs(origin.longitude) - Math.abs(destiny.longitude));
    centerRegion.latitudeDelta =
      1.2 * Math.abs(Math.abs(origin.latitude) - Math.abs(destiny.latitude));

    return centerRegion;
  };

  useEffect(() => {
    var centerRegion = { ...region };

    centerRegion.longitude = (origin.longitude + destiny.longitude) / 2;
    centerRegion.latitude = (origin.latitude + destiny.latitude) / 2;

    centerRegion.longitudeDelta =
      1.2 * Math.abs(Math.abs(origin.longitude) - Math.abs(destiny.longitude));
    centerRegion.latitudeDelta =
      1.2 * Math.abs(Math.abs(origin.latitude) - Math.abs(destiny.latitude));

    setRegion(centerRegion);
  }, [origin, destiny]);

  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ ...styles.mapView, ...dimensions }}
        mapType={"standard"}
        region={region}
        zoomEnabled={true}
        zoomControlEnabled={false}
        maxZoomLevel={18}
        minZoomLevel={6}
        loadingEnabled={true}
      >
        <Polyline
          coordinates={coordinateList}
          strokeWidth={5}
          strokeColor={COLORS.TURKEY_CLEAR}
        />
        {typePassenger === "driver" ? (
          <Marker
            key={1}
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
            image={require("../../assets/images/car.png")}
          />
        ) : (
          <Marker
            key={1}
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
            image={require("../../assets/images/passenger.png")}
          />
        )}
        {markers.map((marker, index) => {
          if (marker.type == "pickUp")
            if (marker.status == "active")
              return (
                <Marker
                  key={index}
                  coordinate={marker.coordinate}
                  image={require("../../assets/images/upToCar.png")}
                />
              );
            else
              return (
                <Marker
                  key={index}
                  coordinate={marker.coordinate}
                  image={require("../../assets/images/upToCarOff.png")}
                />
              );
          else if (marker.status == "active")
            return (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                image={require("../../assets/images/getOutToCar.png")}
              />
            );
          else
            return (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                image={require("../../assets/images/getOutToCarOff.png")}
              />
            );
        })}
      </MapView>
      <TouchableOpacity
        style={styles.touchableStyleBack}
        onPress={() => navigation.goBack()}
      >
        <Feather
          name="chevron-left"
          size={hp("5")}
          color={COLORS.TURKEY}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableCenterMap}
        onPress={() => mapRef.current.animateToRegion(centeredRegion(), 1000)}
      >
        <MaterialCommunityIcons
          name="crosshairs-gps"
          size={hp("5")}
          color={COLORS.TURKEY}
        />
      </TouchableOpacity>
    </>
  );
};

export default MapOngoingTravel;

const styles = StyleSheet.create({
  mapView: {
    zIndex: -1,
  },
  touchableStyleBack: {
    position: "absolute",
    zIndex: -1,
    top: hp("2"),
    left: wp("2"),
    borderRadius: wp("2"),
    backgroundColor: "rgba(127, 127, 127, 0.3)",
  },
  touchableCenterMap: {
    position: "absolute",
    zIndex: -1,
    top: hp("2"),
    right: wp("2"),
    borderRadius: wp("2"),
    backgroundColor: "rgba(127, 127, 127, 0.3)",
  },
});
