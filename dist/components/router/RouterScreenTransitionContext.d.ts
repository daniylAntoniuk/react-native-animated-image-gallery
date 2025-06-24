import * as React from "react";
import { SharedElementNode } from "react-native-shared-element";
export type ScreenTransitionContextOnSharedElementsUpdatedEvent = {
    children: any;
    nodes: {
        [key: string]: SharedElementNode;
    };
    ancestor?: SharedElementNode;
};
export type ScreenTransitionContextProps = {
    style: any;
    children?: any;
    onSharedElementsUpdated: (event: ScreenTransitionContextOnSharedElementsUpdatedEvent) => void;
};
type ScreenTransitionContextState = {
    sharedElementNodes: {
        [key: string]: SharedElementNode;
    };
};
export declare class ScreenTransitionContext extends React.Component<ScreenTransitionContextProps, ScreenTransitionContextState> {
    _sharedElementNodes: {
        [key: string]: SharedElementNode;
    };
    _sharedElementAncestor?: SharedElementNode;
    state: {
        sharedElementNodes: {
            [key: string]: SharedElementNode;
        };
    };
    render(): React.JSX.Element;
    onSetRef: (ref: any) => void;
    componentDidUpdate(prevProps: ScreenTransitionContextProps, prevState: ScreenTransitionContextState): void;
    addSharedElement(sharedId: string, node: SharedElementNode): void;
    removeSharedElement(sharedId: string, node: SharedElementNode): void;
}
export declare function withScreenTransitionContext(WrappedComponent: any): {
    (props: any): React.JSX.Element;
    propTypes: any;
    defaultProps: any;
};
export {};
