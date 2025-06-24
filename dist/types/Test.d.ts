import * as React from "react";
import type { SharedElementAnimation, SharedElementResize, SharedElementAlign } from "react-native-shared-element";
export type Position = "default" | "left" | "top" | "right" | "bottom" | "center";
export type Size = "default" | "small" | "regular" | "large" | "max";
export type ResizeMode = "cover" | "contain" | "stretch" | "center";
export interface Test {
    name: string;
    description?: string;
    start: React.ReactNode;
    end: React.ReactNode;
    animation?: SharedElementAnimation;
    resize?: SharedElementResize;
    align?: SharedElementAlign;
    multi?: boolean;
}
export interface TestGroup {
    name: string;
    tests: (Test | TestGroup)[];
    description?: string;
}
export declare function getTest(test: Test | TestGroup): Test | undefined;
export declare function getTestGroup(test: Test | TestGroup): TestGroup | undefined;
