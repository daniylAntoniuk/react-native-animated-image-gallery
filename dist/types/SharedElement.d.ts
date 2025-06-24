import type { SharedElementAnimation, SharedElementResize, SharedElementAlign } from "react-native-shared-element";
export interface SharedElementStrictConfig {
    readonly id: string;
    readonly otherId: string;
    readonly animation: SharedElementAnimation;
    readonly resize?: SharedElementResize;
    readonly align?: SharedElementAlign;
    readonly debug?: boolean;
}
export interface SharedElemenLooseConfig {
    readonly id: string;
    readonly otherId?: string;
    readonly animation?: SharedElementAnimation;
    readonly resize?: SharedElementResize;
    readonly align?: SharedElementAlign;
    readonly debug?: boolean;
}
export type SharedElementsStrictConfig = SharedElementStrictConfig[];
export type SharedElementConfig = SharedElemenLooseConfig | string;
export type SharedElementsConfig = SharedElementConfig[];
export declare function normalizeSharedElementConfig(sharedElementConfig: SharedElementConfig): SharedElementStrictConfig;
export declare function normalizeSharedElementsConfig(sharedElementsConfig?: SharedElementsConfig | void): SharedElementsStrictConfig | void;
