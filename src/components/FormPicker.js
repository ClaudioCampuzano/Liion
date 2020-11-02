import React, {useState} from 'react';
import { Picker } from '@react-native-picker/picker';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {windowHeight, windowWidth} from "../constants/Dimensions";

export default function FormPicker({...rest }) {
    const [tipo, setTipo] = useState("pasajero");

    return (
            <Picker
                selectedValue={tipo}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) => {
                    console.log(itemValue);
                    setTipo(itemValue);
                }
                }>
                <Picker.Item label="Pasajero" value="pasajero" />
                <Picker.Item label="Conductor" value="conductor" />
            </Picker>
    );
}

