import * as React from "react";
import { Animated } from "react-native";
import type { TransitionConfig } from "../../transitions";
import { SharedElementsConfig, SharedElementsStrictConfig } from "../../types";
import { ScreenTransitionContextOnSharedElementsUpdatedEvent } from "./RouterScreenTransitionContext";
interface RouterProps {
    initialNode: React.ReactNode;
    transitionConfig: TransitionConfig;
}
type RouterAction = {
    action: "push" | "pop";
    config?: RouterConfig;
    node?: React.ReactNode;
};
interface RouterState {
    stack: React.ReactNode[];
    prevIndex: number;
    nextIndex: number;
    animValue: Animated.AnimatedInterpolation<string | number>;
    transitionConfig: TransitionConfig | void;
    sharedElementsConfig: SharedElementsStrictConfig | void;
    sharedElementScreens: (ScreenTransitionContextOnSharedElementsUpdatedEvent | void)[];
    actionsQueue: RouterAction[];
    width: number;
    height: number;
}
type RouterConfig = {
    sharedElements?: SharedElementsConfig;
    transitionConfig?: TransitionConfig;
};
export declare class Router extends React.Component<RouterProps, RouterState> {
    _animValue: Animated.Value;
    _swipeBackAnimValue: Animated.Value;
    _backHandler: any;
    static defaultProps: {
        transitionConfig: any;
    };
    constructor(props: RouterProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderSharedElementTransitions(): React.JSX.Element;
    renderBackSwiper(): React.JSX.Element;
    render(): React.JSX.Element;
    onLayout: (event: any) => void;
    onSharedElementsUpdated: (event: ScreenTransitionContextOnSharedElementsUpdatedEvent) => void;
    onHardwareBackPress: () => boolean;
    onBackSwipe: (nextIndex: number, finish?: boolean) => void;
    push(node: React.ReactNode, config?: RouterConfig): void;
    pop(config?: RouterConfig): void;
    handleAction({ action, config, node }: RouterAction): void;
    pruneStack(count: number): void;
    static push(node: React.ReactNode, config?: RouterConfig): void;
    static pop(config?: RouterConfig): void;
}
export {};
