import React, { useEffect, useState, type ReactNode } from "react";
import { ImageBackground, Pressable, View, type ImageBackgroundProps, type ImageStyle, type StyleProp } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

interface IProps extends ImageBackgroundProps {
    uniqueImageId?: string,
    children?: ReactNode,
    onPress?: () => void,
}
const SharedImage = (props: IProps) => {
    return (
        <SharedElement id={`sharedPhoto.${props.uniqueImageId}`}>
            <Pressable onPress={props.onPress}>
                <ImageBackground
                    {...props}>
                    {props.children ?? <></>}
                </ImageBackground>
            </Pressable>
        </SharedElement>
    )
}
export default SharedImage;