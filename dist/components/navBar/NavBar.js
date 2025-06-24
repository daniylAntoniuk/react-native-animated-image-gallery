import { useCallback } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Colors, Shadows } from "../Colors";
import { Text } from "../Text";
import { Icon } from "../icon";
import { Router } from "../router/Router";
import { useNavBarHeight } from "./constants";
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: Colors.navBar,
        paddingHorizontal: 32,
        paddingBottom: 16,
        //...Shadows.elevation1
    },
    lightContainer: {
        backgroundColor: "transparent",
    },
    backContainer: {
        position: "absolute",
        left: 10,
        bottom: 10,
    },
    icon: Object.assign({}, Shadows.textElevation1),
});
const HIT_SLOP = {
    left: 16,
    top: 16,
    right: 16,
    bottom: 16,
};
export function NavBar(props) {
    const { style, title, back = "default", light, onBack } = props;
    const onPressBack = useCallback(() => {
        if (onBack) {
            onBack();
        }
        else {
            Router.pop();
        }
    }, [onBack]);
    const navBarHeight = useNavBarHeight();
    let icon;
    switch (back) {
        case "default":
            icon = "chevron-left";
            break;
        case "close":
            icon = "cross";
            break;
    }
    return (React.createElement(View, { style: [
            styles.container,
            { height: navBarHeight },
            light ? styles.lightContainer : undefined,
            style,
        ] },
        React.createElement(Text, { large: true, light: light }, title !== null && title !== void 0 ? title : ""),
        icon ? (React.createElement(TouchableOpacity, { style: styles.backContainer, onPress: onPressBack, hitSlop: HIT_SLOP },
            React.createElement(Icon, { style: light ? styles.icon : undefined, name: icon, size: 28, color: light ? Colors.back : Colors.text }))) : undefined));
}
