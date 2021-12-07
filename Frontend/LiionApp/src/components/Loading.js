import React from "react";
import { View, Modal } from "react-native";

import LottieView from "lottie-react-native";

const Loading = () => {
  return (
    <Modal transparent={true} visible={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          alignItems: "center",
        }}
      >
        <LottieView
          source={require("../../assets/76600-loader.json")}
          style={{ width: 100, height: 100 }}
          autoPlay
        />
      </View>
    </Modal>
  );
};

export default Loading;
