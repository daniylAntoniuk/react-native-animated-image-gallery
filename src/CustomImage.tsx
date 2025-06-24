import React, { useEffect, useState, type ReactNode } from "react";
import { ImageBackground, View, type ImageBackgroundProps, type ImageStyle, type StyleProp } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

interface IProps extends ImageBackgroundProps {
    uniqueImageId?: number,
    children?: ReactNode,
}
const CustomImage = (props: IProps) => {
    return (
        <SharedElement id={`sharedPhoto.${props.uniqueImageId}`}>
            <ImageBackground
                {...props}>
                {props.children ?? <></>}
            </ImageBackground>
        </SharedElement>
    )
}
export default CustomImage;