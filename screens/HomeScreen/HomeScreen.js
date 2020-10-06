import React, {  } from 'react';
import { View, Text } from 'react-native';
import MapView from "react-native-maps";
import styles from './styles'

export default function Home(...props) {
   
    return (
        console.log(3),
        console.log(JSON.stringify(props.user)),

        <View style={styles.container}>
           

            <MapView style={styles.map} />
            <View style={styles.mapDrawerOverlay} />

           

        </View>
       

    );
}