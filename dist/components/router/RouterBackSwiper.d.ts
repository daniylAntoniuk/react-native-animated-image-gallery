import { Animated } from "react-native";
type Props = {
    width: number;
    animValue: Animated.Value;
    prevIndex: number;
    nextIndex: number;
    onBackSwipe: (nextIndex: number, finish?: boolean) => void;
};
export declare function RouterBackSwiper(props: Props): import("react").JSX.Element;
export {};
