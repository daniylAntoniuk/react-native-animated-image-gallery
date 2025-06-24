import React, { type ReactNode } from "react";
import { type ImageBackgroundProps } from "react-native";
interface IProps extends ImageBackgroundProps {
    uniqueImageId?: number;
    children?: ReactNode;
}
declare const CustomImage: (props: IProps) => React.JSX.Element;
export default CustomImage;
