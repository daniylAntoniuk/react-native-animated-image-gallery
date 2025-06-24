import React from "react";
import { ImageBackground } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
const CustomImage = (props) => {
    var _a;
    return (React.createElement(SharedElement, { id: `sharedPhoto.${props.uniqueImageId}` },
        React.createElement(ImageBackground, Object.assign({}, props), (_a = props.children) !== null && _a !== void 0 ? _a : React.createElement(React.Fragment, null))));
};
export default CustomImage;
