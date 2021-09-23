import React from "react";
import { View, Text } from "react-native";

import CreateStepOne from "../screens/createTrip/CreateStepOne";

import { COLORS, hp, wp, loadFonts } from "../constants/styleThemes";

const CreateNavigator = () => {
  const CreateStack = createStackNavigator();
  const fontsLoaded = loadFonts();
  return (
    fontsLoaded && (
      <CreateStack.Navigator>
        <CreateStack.Screen
          name="CreateStepOne"
          component={CreateStepOne}
          options={{ headerShown: true }}
        />
      </CreateStack.Navigator>
    )
  );
};

export default CreateNavigator;
