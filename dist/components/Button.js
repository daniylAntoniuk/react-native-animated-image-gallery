import * as React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Shadows, Colors } from "./Colors";
import { Text } from "./Text";
const HEIGHT = 44;
const styles = StyleSheet.create({
    container: Object.assign({ backgroundColor: Colors.blue, height: HEIGHT, borderRadius: HEIGHT / 2, paddingHorizontal: 12, justifyContent: "center", alignItems: "center" }, Shadows.elevation1),
});
export function Button(props) {
    const { label, onPress, style } = props;
    return (React.createElement(TouchableOpacity, { activeOpacity: 0.5, disabled: !onPress, onPress: onPress, style: style },
        React.createElement(View, { style: [styles.container] },
            React.createElement(Text, { large: true, color: "white" }, label))));
}
