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
import { SharedElement } from "react-native-shared-element";
import { withScreenTransitionContext, } from "./RouterScreenTransitionContext";
export const RouterScreenTransition = withScreenTransitionContext(class RouterScreenTransition extends React.Component {
    constructor(props) {
        super(props);
        this._sharedId = "";
        this.onSetNode = (node) => {
            if (this._node === node) {
                return;
            }
            if (this._node && this._sharedId) {
                // @ts-ignore
                this.props.screenTransitionContext.removeSharedElement(this._sharedId, this._node);
            }
            this._node = node;
            if (this._node && this._sharedId) {
                this.props.screenTransitionContext.addSharedElement(this._sharedId, this._node);
            }
            this._node = node;
        };
        this._sharedId = props.sharedId;
    }
    componentDidUpdate() {
        const { sharedId, screenTransitionContext } = this.props;
        if (this._sharedId !== sharedId) {
            if (this._sharedId && this._node) {
                screenTransitionContext.removeSharedElement(this._sharedId, this._node);
            }
            this._sharedId = sharedId;
            if (this._sharedId && this._node) {
                screenTransitionContext.addSharedElement(this._sharedId, this._node);
            }
        }
    }
    render() {
        const _a = this.props, { sharedId, screenTransitionContext } = _a, otherProps = __rest(_a, ["sharedId", "screenTransitionContext"]);
        return React.createElement(SharedElement, Object.assign({}, otherProps, { onNode: this.onSetNode }));
    }
});
export const ScreenTransition = RouterScreenTransition;
