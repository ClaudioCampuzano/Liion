import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import LeftIconUpcomingTravel from "../components/LeftIconUpcomingTravel";
import SearchStepOne from "../screens/searchTrip/SearchStepOne";
import SearchStepTwo from "../screens/searchTrip/SearchStepTwo";
import SearchStepThree from "../screens/searchTrip/SearchStepThree";
import SearchStepFour from "../screens/searchTrip/SearchStepFour";
import SucessScreen from "../screens/SucessScreen";
import DrawerIconCustom from "../components/DrawerIconCustom";
import { COLORS, hp, wp } from "../constants/styleThemes";
import { GlobalContext } from "../context/Provider";

const SearchNavigator = () => {
  const { travelStatus } = useContext(GlobalContext);

  const SearchStack = createStackNavigator();

  return (
    <SearchStack.Navigator initialRouteName="SearchStepOne">
      <SearchStack.Screen
        name="SearchStepOne"
        component={SearchStepOne}
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
            <TouchableOpacity onPress={() => console.log("chat")}>
              <Entypo
                name="chat"
                size={hp("5%")}
                color={COLORS.WHITE}
                style={{ marginRight: wp("3%") }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => <DrawerIconCustom alert={travelStatus} />,
        })}
      />
      <SearchStack.Screen
        name="SearchStepTwo"
        component={SearchStepTwo}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: styles.headerContainer,
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerText,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="md-chevron-back"
                size={hp("5%")}
                color={COLORS.WHITE}
                style={{ marginLeft: wp("3%") }}
              />
            </TouchableOpacity>
          ),
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
        })}
      />
      <SearchStack.Screen
        name="SearchStepThree"
        component={SearchStepThree}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <SearchStack.Screen
        name="SearchStepFour"
        component={SearchStepFour}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: styles.headerContainerEmpty,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather
                name="chevron-left"
                size={hp("5.5")}
                color={COLORS.TURKEY}
                style={{ marginLeft: wp("3%") }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <SearchStack.Screen
        name="SucessScreen"
        component={SucessScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
    </SearchStack.Navigator>
  );
};

export default SearchNavigator;

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
  headerContainerEmpty: {
    backgroundColor: COLORS.WHITE,
    height: hp("7%"),
    elevation: 0,
  },
});
