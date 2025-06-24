import { Animated, type ViewStyle } from 'react-native';
export interface ExpandingDotProps {
    data: Array<Object>;
    scrollX: Animated.Value;
    containerStyle: ViewStyle;
    dotStyle: ViewStyle;
    inActiveDotOpacity?: number;
    inActiveDotColor?: string;
    expandingDotWidth?: number;
    activeDotColor?: string;
    onL?: any;
}
declare const ExpandingDot: ({ scrollX, data, dotStyle, containerStyle, inActiveDotOpacity, inActiveDotColor, expandingDotWidth, activeDotColor, onL }: ExpandingDotProps) => import("react").JSX.Element;
export default ExpandingDot;
