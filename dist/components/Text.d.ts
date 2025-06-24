import * as React from "react";
import { Text as RawText } from "react-native";
export type Size = "regular" | "small" | "large" | "xlarge" | "xxlarge";
export type SizeProps = {
    size?: Size;
    small?: boolean;
    large?: boolean;
    xlarge?: boolean;
    xxlarge?: boolean;
};
export declare function resolveSize(props: SizeProps): Size;
export declare function Text(props: React.ComponentProps<typeof RawText> & {
    children: string;
    small?: boolean;
    large?: boolean;
    xlarge?: boolean;
    xxlarge?: boolean;
    color?: string;
    center?: boolean;
    flex?: boolean;
    uppercase?: boolean;
    light?: boolean;
}): React.JSX.Element;
