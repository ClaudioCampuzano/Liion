import React, { Component } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import styles from './styles';

const LOCATION_TASK_NAME = "background-location-task";

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: null,
            error: '',
        };
    }

    _getLocationAsync = async () => {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            enableHighAccuracy: true,
            distanceInterval: 1,
            timeInterval: 60000
        });
        // watchPositionAsync Return Lat & Long on Position Change
        this.location = await Location.watchPositionAsync(
            {
                enableHighAccuracy: true,
                distanceInterval: 1,
                timeInterval: 60000
            },
            newLocation => {
                let { coords } = newLocation;
                // console.log(coords);
                let region = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.045,
                    longitudeDelta: 0.045
                };
                this.setState({ region: region });
            },
            error => console.log(error)
        );
        return this.location;
    };
    async UNSAFE_componentWillMount() {
        // Asking for device location permission
        const { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status === "granted") {
            this._getLocationAsync();
        } else {
            this.setState({ error: "Locations services needed" });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    region={this.state.region}
                    showsCompass={true}
                    showsTraffic={true}
                    showsUserLocation={true}
                    rotateEnabled={true}
                    ref={map => {
                        this.map = map;
                    }}
                    style={{ flex: 1 }}
                />
                <View style={styles.mapDrawerOverlay} />
            </View>
        );
    }
}

