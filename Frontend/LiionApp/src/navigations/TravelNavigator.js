import React, {useContext} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import LeftIconUpcomingTravel from '../components/LeftIconUpcomingTravel'
import TravelTabNavigator from "./TravelTabNavigator";
import TravelVisualizer from "../screens/travel/TravelVisualizer";
import TravelVisualizerDriver from "../screens/travel/TravelVisualizerDriver";
import OngoingTravelDriver from "../screens/travel/OngoingTravelDriver";
import OngoingTravelPassenger from "../screens/travel/OngoingTravelPassenger";
import Feedback from "../screens/travel/Feedback";
import DrawerIconCustom from "../components/DrawerIconCustom";

import { COLORS, hp, wp } from "../constants/styleThemes";
import { GlobalContext } from "../context/Provider";
const TravelNavigator = () => {
  const { travelStatus, updateTravelStatus } = useContext(GlobalContext);
  const TravelStack = createStackNavigator();
 const testongoing  = () => {
    if (travelStatus === 'ongoing'){
      updateTravelStatus('')}
    else if (travelStatus === ''){
      updateTravelStatus('ongoing')
    }
 }
  return (
    <TravelStack.Navigator>
      <TravelStack.Screen
        name="TravelTabNavigator"
        component={TravelTabNavigator}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: styles.headerContainer,
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerText,
          headerTitle: (props) => (
            <Image
              style={{
                width: wp("11.8"),
                height: hp("6.95"),
                tintColor: COLORS.WHITE,
              }}
              source={require("../../assets/images/miniLogo.png")}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => testongoing()}>
              <Entypo
                name="chat"
                size={hp("5%")}
                color={COLORS.WHITE}
                style={{ marginRight: wp("3%") }}
              />
            </TouchableOpacity>
          ),
          //headerLeft: () => <DrawerIconCustom alert={true} />,
          headerLeft: () => <LeftIconUpcomingTravel onPress={() => navigation.toggleDrawer()}/>
        })}
      />

      <TravelStack.Screen
        name="TravelVisualizer"
        component={TravelVisualizer}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <TravelStack.Screen
        name="TravelVisualizerDriver"
        component={TravelVisualizerDriver}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <TravelStack.Screen
        name="OngoingTravelDriver"
        component={OngoingTravelDriver}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <TravelStack.Screen
        name="OngoingTravelPassenger"
        component={OngoingTravelPassenger}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <TravelStack.Screen
        name="Feedback"
        component={Feedback}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
    </TravelStack.Navigator>
  );
};

export default TravelNavigator;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.TURKEY,
    height: hp("7%"),
  },
  headerText: {
    color: COLORS.WHITE,
    fontFamily: "Gotham-SSm-Book",
    fontSize: hp("3.5%"),
  },
});
