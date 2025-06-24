import { type ImageSourcePropType, type ImageStyle, type StyleProp, type ViewProps } from "react-native";
interface Props extends ViewProps {
    images: ImageSourcePropType[];
    uniqueImageId?: string;
    imageStyle?: StyleProp<ImageStyle>;
}
declare const ImagesCarousel: (props: Props) => import("react").JSX.Element;
export default ImagesCarousel;
