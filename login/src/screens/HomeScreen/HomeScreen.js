
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'


import { SwipeablePanel } from 'rn-swipeable-panel';

/* jiro
export default function HomeScreen(props) {
    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    )
}
*/

export default function HomeScreen(props) {
    const [isPanelActive, setIsPanelActive] = useState(true);
    const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    open: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  return (
    

    

    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text >Welcome to React Native! </Text>
      <Text >To get started, edit App.js</Text>


      <View style={styles.bottomView}>
          
    <Button color="#ff5c5c" title="jirobuton" onPress={openPanel}  />
    </View>
   
        
      <SwipeablePanel
          fullWidth
          onlySmall
          isActive={isPanelActive}
          onClose={closePanel}
          onPressCloseButton={closePanel}>
          <Text >Welcome to React Native! </Text>
 </SwipeablePanel>
 


    </View>
  );
};

//<Text style={styles.textStyle}>Bottom View</Text>
const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
});


/*
export default App = () => {
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <PanelContent /> { writte jiro here on comment}
      </SwipeablePanel>
    </View>
  );
};

*/