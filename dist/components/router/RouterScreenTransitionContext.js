var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { View } from "react-native";
import { nodeFromRef } from "react-native-shared-element";
// @ts-ignore Argument of type 'undefined' is not assignable to parameter of type 'ScreenTransitionContext'.
const Context = React.createContext(undefined);
export class ScreenTransitionContext extends React.Component {
    constructor() {
        super(...arguments);
        this._sharedElementNodes = {};
        this._sharedElementAncestor = undefined;
        this.state = {
            sharedElementNodes: this._sharedElementNodes,
        };
        this.onSetRef = (ref) => {
            this._sharedElementAncestor = nodeFromRef(ref) || undefined;
        };
    }
    render() {
        const _a = this.props, { onSharedElementsUpdated, style } = _a, otherProps = __rest(_a, ["onSharedElementsUpdated", "style"]);
        //console.log("this", this);
        return (React.createElement(View, { style: style, collapsable: false, ref: this.onSetRef },
            React.createElement(Context.Provider, Object.assign({ value: this }, otherProps))));
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState === this.state) {
            return;
        }
        const { children, onSharedElementsUpdated } = this.props;
        const { sharedElementNodes } = this.state;
        if (onSharedElementsUpdated) {
            onSharedElementsUpdated({
                children,
                ancestor: this._sharedElementAncestor,
                nodes: sharedElementNodes,
            });
        }
    }
    addSharedElement(sharedId, node) {
        // console.log('ScreenTransitionContext.add: ', sharedId);
        const sharedElementNodes = Object.assign({}, this._sharedElementNodes);
        sharedElementNodes[sharedId] = node;
        this._sharedElementNodes = sharedElementNodes;
        this.setState({
            sharedElementNodes,
        });
    }
    removeSharedElement(sharedId, node) {
        // console.log('ScreenTransitionContext.remove: ', sharedId);
        const sharedElementNodes = Object.assign({}, this._sharedElementNodes);
        delete sharedElementNodes[sharedId];
        this._sharedElementNodes = sharedElementNodes;
        this.setState({
            sharedElementNodes,
        });
    }
}
export function withScreenTransitionContext(WrappedComponent) {
    const comp = (props) => {
        return (React.createElement(ScreenTransitionContext, null,
            React.createElement(Context.Consumer, null, (value) => {
                //console.log("lof", value)
                return (React.createElement(WrappedComponent, Object.assign({}, props, { screenTransitionContext: value })));
            })));
    };
    if (WrappedComponent.propTypes) {
        const propTypes = Object.assign({}, WrappedComponent.propTypes);
        delete propTypes.screenTransitionContext;
        comp.propTypes = propTypes;
    }
    comp.defaultProps = WrappedComponent.defaultProps;
    return comp;
}
