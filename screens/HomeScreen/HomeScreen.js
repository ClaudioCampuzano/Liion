import React from 'react';
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class HomeScreen extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <MapView style={styles.map}>
                </MapView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
});
