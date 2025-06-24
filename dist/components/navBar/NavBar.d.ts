import { ViewStyle } from "react-native";
type Props = {
    style?: ViewStyle;
    title?: string;
    back?: "default" | "none" | "close";
    light?: boolean;
    onBack?: () => void;
};
export declare function NavBar(props: Props): import("react").JSX.Element;
export {};
