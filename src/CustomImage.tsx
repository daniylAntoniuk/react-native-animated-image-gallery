import React, { useEffect, useState, type ReactNode } from "react";
import { ImageBackground, View, type ImageStyle, type StyleProp } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

interface IProps {
    type?: number,
    id?: number,
    image: string,
    style?: StyleProp<ImageStyle>,
    transperent?: boolean,
    delete?: boolean,
    children?: ReactNode,
}
const CustomImage = (props: IProps) => {
    const [selected, setSelected] = useState(false);
    return (
        <SharedElement id={`${props.type}.heroPhoto.${props.id}.0`}>
            <ImageBackground source={{ uri: props.image }}
                style={[props.style ?? { height: 225, marginVertical: 5 }, { flexDirection: "column" }]}
                resizeMode="cover" imageStyle={{ borderRadius: 16 }}>
                {props.children ?? <></>}
            </ImageBackground>
        </SharedElement>
    )
}
export default CustomImage;