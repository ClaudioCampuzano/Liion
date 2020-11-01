import {Button, Text, View} from "react-native";
import React from "react";

export default function Notificaciones({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Notificaciones!</Text>
            <Button
                onPress={() => navigation.goBack()}
                title="Go back home"
            />
        </View>
    );
}
