import { Dimensions, PixelRatio } from "react-native";

//https://medium.com/building-with-react-native/how-to-develop-responsive-uis-with-react-native-1x03-a448097c9503
const widthPercentageToDP = (widthPercent) => {
  const screenWidth = Dimensions.get("window").width;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};
const heightPercentageToDP = (heightPercent) => {
  const screenHeight = Dimensions.get("window").height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const COLORS  = {
    WHITE: "#FFFFFF",
    TURKEY: "#009999",
    TURKEY_CLEAR: "#60BFB6",
    LEAD: "#666666",
    BORDER_COLOR: "#D9D9D9",
  };

export { widthPercentageToDP, heightPercentageToDP, COLORS };
