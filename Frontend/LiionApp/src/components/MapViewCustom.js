import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Constants from "expo-constants";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { COLORS, hp, wp } from "../constants/styleThemes";

const MapViewCustom = (props) => {
  const { dimensions, coordinates, mapDirections, showGps, ...restOfProps } =
    props;

  const mapRef = useRef();

  if (showGps) {
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        updateLocationState(location);
      })();
    }, []);

    const updateLocationState = (locObj) => {
      let temploc = { ...sGPS };
      temploc.latitude = locObj.coords.latitude;
      temploc.longitude = locObj.coords.longitude;
      setsGPS(temploc);
    };
  } else useEffect(() => setsGPS(overviewRegion), []);

  const CenterMap = () => {
    mapRef.current.animateToRegion(sGPS, 1000);
  };

  const changeRuteInfoHandler = (InfoObj) => {
    let aux2 = {
      distance: InfoObj.distance,
      duration: InfoObj.duration,
      coordinates: InfoObj.coordinates,
    };
    props.onDataExtract(aux2);
  };

  const [sGPS, setsGPS] = useState(() => {
    let latitude = 0;
    let longitude = 0;
    let maplenght = dimensions.height;
    let mapwidth = dimensions.width;
    if (mapwidth == 0) mapwidth = 1;
    let ratio = maplenght / mapwidth;
    let widthLongitudeDelta = 0.01;
    let lenghtLatitudeDelta = widthLongitudeDelta * ratio;
    return {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: lenghtLatitudeDelta,
      longitudeDelta: widthLongitudeDelta,
    };
  });

  const CenterTravel = () => {
    mapRef.current.animateToRegion(overviewRegion(), 1000);
  };

  const ArrowBack = () => {
    props.ArrowBack(true);
  };

  const overviewRegion = () => {
    let centerTravel = { ...sGPS };
    let latAVG =
      (coordinates[0].latitude + coordinates[coordinates.length - 1].latitude) /
      2;
    let longAVG =
      (coordinates[0].longitude +
        coordinates[coordinates.length - 1].longitude) /
      2;
    centerTravel.longitude = longAVG;
    centerTravel.latitude = latAVG;
    let deltalat = Math.abs(
      Math.abs(coordinates[0].latitude) -
        Math.abs(coordinates[coordinates.length - 1].latitude)
    );
    let deltalong = Math.abs(
      Math.abs(coordinates[0].longitude) -
        Math.abs(coordinates[coordinates.length - 1].longitude)
    );
    centerTravel.longitudeDelta = 1.3 * deltalong;
    centerTravel.latitudeDelta = 1.3 * deltalat;
    return centerTravel;
  };
  //asi cambiar el marker justo dentro del MapView.Marker, nota. debe ser un componente hijo, como marker es de mapview ;)
  // <Image source={require('./man_marker.png')} style={{height: 35, width:35 }} />
  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ ...styles.mapView, ...dimensions }}
        initialRegion={sGPS}
        region={sGPS}
        rotateEnabled={false}
        showsCompass={false}
      >
        {showGps && (
          <Marker
            coordinate={{
              latitude: sGPS.latitude,
              longitude: sGPS.longitude,
            }}
            title={"title"}
            description={"description"}
            pinColor={COLORS.WARN_YELLOW}
          />
        )}

        {coordinates && (
          <>
            {mapDirections ? (
              <MapViewDirections
                origin={coordinates[0]}
                waypoints={
                  coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
                }
                destination={coordinates[coordinates.length - 1]}
                apikey={Constants.manifest.extra.firebase.apiKey} // insert your API Key here
                strokeWidth={5}
                strokeColor={COLORS.TURKEY_CLEAR}
                language={"es"}
                onReady={(result) => {
                  changeRuteInfoHandler(result);
                }}
                onError={(errorMessage) => {
                  console.log(`GOT AN ERROR ${errorMessage}`);
                }}
              />
            ) : (
              <Polyline
                coordinates={coordinates}
                strokeWidth={5}
                strokeColor={COLORS.TURKEY_CLEAR}
              />
            )}
            <Marker coordinate={coordinates[0]} pinColor={COLORS.TURKEY} />
            <Marker
              coordinate={coordinates[coordinates.length - 1]}
              pinColor={COLORS.TURKEY}
            />
          </>
        )}
      </MapView>
      <TouchableOpacity
        style={styles.touchableStyleBack}
        onPress={() => ArrowBack()}
      >
        <Feather
          name="chevron-left"
          size={hp("5.5")}
          color={COLORS.TURKEY}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      {showGps && (
        <>
          <TouchableOpacity
            style={styles.touchableCenterMap}
            onPress={() => CenterMap()}
          >
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={hp("4.2")}
              color={COLORS.TURKEY}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableCenterTravel}
            onPress={() => CenterTravel()}
          >
            <MaterialCommunityIcons
              name="wallet-travel"
              size={hp("4.2")}
              color={COLORS.TURKEY}
            />
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default MapViewCustom;

MapViewCustom.defaultProps = {
  onDataChange: () => {},
};

MapViewCustom.defaultProps = {
  onDataExtract: () => {},
};

const styles = StyleSheet.create({
  mapView: {
    zIndex: -1,
  },
  iconStyle: {
    left: wp("0"),
  },
  touchableStyleBack: {
    position: "absolute",
    zIndex: 99999,
    top: hp("1.5%"),
    left: wp("3"),
    borderRadius: wp("10"),
  },
  touchableCenterMap: {
    position: "absolute",
    zIndex: 99999,
    top: hp("2%"),
    left: wp("90"),
    borderRadius: wp("2"),
    backgroundColor: "rgba(127, 127, 127, 0.3)",
  },
  touchableCenterTravel: {
    position: "absolute",
    zIndex: 99999,
    top: hp("10%"),
    left: wp("90"),
    borderRadius: wp("2"),
    backgroundColor: "rgba(127, 127, 127, 0.3)",
  },
});