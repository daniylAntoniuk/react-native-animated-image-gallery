import { StyleSheet, View, Image } from "react-native";
import { NavBar, SharedElement, Colors } from "./components";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.back,
    },
    navBar: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
    },
    content: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: "100%",
        resizeMode: "cover",
    },
});
export function DetailScreen(props) {
    var _a;
    const { navigation } = props;
    const hero = (_a = navigation === null || navigation === void 0 ? void 0 : navigation.getParam("hero")) !== null && _a !== void 0 ? _a : props.hero;
    const { photo, id } = hero;
    return (React.createElement(View, { style: styles.container },
        React.createElement(View, { style: styles.content },
            React.createElement(SharedElement, { navigation: navigation, id: `heroPhoto.${id}`, style: styles.content },
                React.createElement(Image, { style: styles.image, source: photo }))),
        !navigation ? (React.createElement(NavBar, { back: "close", light: true, style: styles.navBar })) : undefined));
}
