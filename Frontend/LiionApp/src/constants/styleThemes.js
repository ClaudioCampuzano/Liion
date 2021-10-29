import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useFonts } from "expo-font";

const COLORS = {
  WHITE: "#FFFFFF",
  TURKEY: "#009999",
  TURKEY_CLEAR: "#60BFB6",
  LEAD: "#666666",
  BORDER_COLOR: "#D9D9D9",
  BLACK: "#333333",
  LIGHT_LEAD: "#CCCCCC",
  REAL_BLACK:"#000000",
  WARN_RED:"#d90707",
  CHECK_GREEN:"#0FF506",
  WARN_YELLOW:"#f5dd0a",
  GRAY:"#BFBFBF",
  TURKEY_CLEARER:"#84FFF3",
};

const loadFonts = () => {
  const [fontsLoaded, error] = useFonts({
    "Gotham-SSm-Bold": require("../../assets/fonts/GothamSSm-Bold.ttf"),
    "Gotham-SSm-Book": require("../../assets/fonts/GothamSSm-Book.ttf"),
    "Gotham-SSm-Medium": require("../../assets/fonts/GothamSSm-Medium.ttf"),
  });
  return {fontsLoaded}
}

export { COLORS, hp, wp, loadFonts };
