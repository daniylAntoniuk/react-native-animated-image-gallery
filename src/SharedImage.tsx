import React, { type ReactNode } from "react";
import { ImageBackground, Pressable, type ImageBackgroundProps, type ViewStyle, type StyleProp, } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

interface IProps extends ImageBackgroundProps {
    uniqueImageId?: string,
    children?: ReactNode,
    onPress?: () => void,
    containerStyle?: StyleProp<ViewStyle>,
}
const SharedImage = (props: IProps) => {
    console.log(`sharedPhoto.${props.uniqueImageId}`);
    return (
        <SharedElement style={props.containerStyle} id={`sharedPhoto.${props.uniqueImageId}`}>
            <Pressable style={props.containerStyle} onPress={props.onPress}>
                <ImageBackground
                    {...props}>
                    {props.children ?? <></>}
                </ImageBackground>
            </Pressable>
        </SharedElement>
    )
}
export default SharedImage;