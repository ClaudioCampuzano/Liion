import React, { useContext, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS, hp, wp } from "../constants/styleThemes"
import { GlobalContext } from "../context/Provider";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";

const LeftIconUpcomingTravel = (props) => {

  const { travelStatus } = useContext(GlobalContext);

  //ese era el icono mas parecido, y bueno el color destaca pero no tanto color E35F0E (medio naranjo cuando viaje adportas) y sera C90101 viaje encurso
  //que se puede ahi, humildemente
  
  return (
    <>
      {travelStatus === 'soon' ? (
        <TouchableOpacity onPress={props.onPress}>
          <Ionicons
            name="navigate"
            size={hp("5%")}
            color={COLORS.UPTRAVEL_WARN}
            style={{ marginLeft: wp("3%") }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={props.onPress}>
          <Entypo
            name="menu"
            size={hp("5%")}
            color={COLORS.WHITE}
            style={{ marginLeft: wp("3%") }}
          />
        </TouchableOpacity>
      )}
    </>
  );
};


export default LeftIconUpcomingTravel;



