import { useCallback } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Colors } from "./Colors";
import { Text } from "./Text";
import React from "react";
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.back,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderColor: Colors.separator,
        borderBottomWidth: StyleSheet.hairlineWidth,
        minHeight: 60,
    },
    content: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    description: {
        marginTop: 1,
    },
    image: {
        width: 44,
        height: 44,
        borderRadius: 22,
        resizeMode: "cover",
        marginRight: 16,
        shadowColor: "#000",
        /*shadowOffset: {
          width: 0,
          height: 11
        },*/
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        //borderWidth: 4,
        //borderColor: "orange"
    },
});
export function ListItem(props) {
    const { label, description, onPress, data, image } = props;
    const onPressCallback = useCallback(() => onPress === null || onPress === void 0 ? void 0 : onPress(data), [onPress, data]);
    return (React.createElement(TouchableOpacity, { activeOpacity: 0.5, disabled: !onPress, onPress: onPressCallback },
        React.createElement(View, { style: styles.container },
            image ? React.createElement(Image, { style: styles.image, source: image }) : undefined,
            React.createElement(View, { style: styles.content },
                React.createElement(Text, { large: true }, label),
                description ? (React.createElement(Text, { small: true, style: styles.description }, description)) : undefined))));
}
