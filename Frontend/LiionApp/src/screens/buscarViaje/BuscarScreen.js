import React from "react";
import { View, Text, Animated } from "react-native";

import Layout from "../../components/Layout";

const BuscarScreen = () => {
  const translation = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 }));
  useEffect(() => {
    Animated.sequence([
      Animated.timing(translation, {
        toValue: 50,
        delay: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(position, {
        toValue: { x: 100, y: 100 },
        duration: 1000,
      }),
    ]).start();
  }, []);
  return (
    <View>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "orange",
          transform: [{ translateX: translation }],
        }}
      />
    </View>
  );
};

export default BuscarScreen;
