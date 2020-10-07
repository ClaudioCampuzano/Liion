import React, {  } from 'react';
import { View, Text } from 'react-native';
import MapView from "react-native-maps";
import styles from './styles'
import useLocation from "../../hooks/useLocation";

export default function Home() {
    const dateLocation = useLocation();

    return dateLocation.errorMsg || !dateLocation.location ? (
        <View style={styles.container}>
            <Text>¡¡Cargando Jiro!!</Text>
        </View>
    ) : (
        <View style={styles.container}>
            <MapView style={styles.map}
                     initialRegion={{
                         latitude: dateLocation.location.coords.latitude,
                         longitude: dateLocation.location.coords.longitude,
                         latitudeDelta: 0.045,
                         longitudeDelta: 0.045
                     }}
                     showsUserLocation={true}
                     showsCompass={true}
                     rotateEnabled={true}
                     minZoomLevel={6}
                     maxZoomLevel={18}
            />
            <View style={styles.mapDrawerOverlay} />
        </View>
    );
}
