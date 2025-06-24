var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { StyleSheet, Text as RawText } from "react-native";
import { Colors } from "./Colors";
export function resolveSize(props) {
    var _a;
    return ((_a = props.size) !== null && _a !== void 0 ? _a : (props.small
        ? "small"
        : props.large
            ? "large"
            : props.xlarge
                ? "xlarge"
                : props.xxlarge
                    ? "xxlarge"
                    : "regular"));
}
export function Text(props) {
    const { color, children, small, large, xlarge, style, center, flex, uppercase, light } = props, otherProps = __rest(props, ["color", "children", "small", "large", "xlarge", "style", "center", "flex", "uppercase", "light"]);
    const resolvedSize = resolveSize(props);
    return (React.createElement(RawText, Object.assign({ style: [
            styles[resolvedSize],
            color ? { color } : undefined,
            center ? styles.center : undefined,
            flex ? styles.flex : undefined,
            light ? styles.light : undefined,
            style,
        ] }, otherProps), typeof children === "string" && uppercase
        ? children.toUpperCase()
        : children));
}
const styles = StyleSheet.create({
    center: {
        textAlign: "center",
    },
    flex: {
        flex: 1,
    },
    xxlarge: {
        fontSize: 40,
        fontWeight: "bold",
        color: Colors.text,
    },
    xlarge: {
        fontSize: 30,
        fontWeight: "bold",
        color: Colors.text,
    },
    large: {
        fontSize: 17,
        fontWeight: "700",
        color: Colors.text,
    },
    small: {
        fontSize: 14,
        fontWeight: "400",
        color: Colors.gray,
    },
    regular: {
        fontSize: 17,
        fontWeight: "500",
        color: Colors.gray,
    },
    light: {
        color: Colors.back,
    },
});
