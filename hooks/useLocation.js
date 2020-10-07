import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function useCoordenadas(){
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() =>{
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    },[]);
    return ({location,errorMsg});
}
