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
import { StyleSheet, View, Animated, BackHandler, Dimensions, } from "react-native";
import { enableScreens, screensEnabled, ScreenContainer, Screen, } from "react-native-screens";
import { SharedElementTransition } from "react-native-shared-element";
import { fromRight } from "../../transitions";
import { normalizeSharedElementsConfig } from "../../types/SharedElement";
import { RouterBackSwiper } from "./RouterBackSwiper";
import { ScreenTransitionContext, } from "./RouterScreenTransitionContext";
enableScreens();
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    node: Object.assign({}, StyleSheet.absoluteFillObject),
    sharedElements: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { zIndex: 1000 }),
});
let router;
let AnimatedScreen;
const MaybeScreenContainer = (props) => {
    if (screensEnabled()) {
        return React.createElement(ScreenContainer, Object.assign({}, props));
    }
    return React.createElement(View, Object.assign({}, props));
};
const AnimatedRouterScreen = (props) => {
    const { active } = props, otherProps = __rest(props, ["active"]);
    if (screensEnabled()) {
        AnimatedScreen = AnimatedScreen || Animated.createAnimatedComponent(Screen);
        return React.createElement(AnimatedScreen, Object.assign({ activityState: active ? 2 : 0 }, otherProps));
    }
    return React.createElement(Animated.View, Object.assign({}, otherProps));
};
export class Router extends React.Component {
    constructor(props) {
        super(props);
        this._animValue = new Animated.Value(0);
        this._swipeBackAnimValue = new Animated.Value(0);
        this.onLayout = (event) => {
            const { width, height } = event.nativeEvent.layout;
            if (this.state.width !== width || this.state.height !== height) {
                this.setState({
                    width,
                    height,
                    animValue: Animated.subtract(this._animValue, this._swipeBackAnimValue.interpolate({
                        inputRange: [0, width],
                        outputRange: [0, 1],
                        extrapolate: "clamp",
                    })),
                });
            }
        };
        this.onSharedElementsUpdated = (event) => {
            const { stack, sharedElementScreens } = this.state;
            const index = stack.indexOf(event.children);
            if (index < 0) {
                return;
            }
            const newSharedElementScreens = [...sharedElementScreens];
            newSharedElementScreens[index] = event;
            this.setState({
                sharedElementScreens: newSharedElementScreens,
            });
        };
        this.onHardwareBackPress = () => {
            if (this.state.stack.length > 1) {
                this.pop();
                return true;
            }
            return false;
        };
        this.onBackSwipe = (nextIndex, finish) => {
            if (finish) {
                this.pruneStack(nextIndex + 1);
                this._swipeBackAnimValue.setValue(0);
                this._animValue.setValue(this.state.nextIndex);
            }
            else {
                this.setState({ nextIndex });
            }
        };
        router = this; //eslint-disable-line consistent-this
        this.state = {
            stack: [props.initialNode],
            actionsQueue: [],
            prevIndex: 0,
            nextIndex: 0,
            animValue: Animated.subtract(this._animValue, this._swipeBackAnimValue.interpolate({
                inputRange: [0, Dimensions.get("window").width],
                outputRange: [0, 1],
                extrapolate: "clamp",
            })),
            sharedElementScreens: [],
            sharedElementsConfig: undefined,
            transitionConfig: undefined,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
        };
    }
    componentDidMount() {
        this._backHandler = BackHandler.addEventListener("hardwareBackPress", this.onHardwareBackPress);
    }
    componentWillUnmount() {
        this._backHandler.remove();
    }
    renderSharedElementTransitions() {
        const { prevIndex, nextIndex, stack, sharedElementScreens, sharedElementsConfig, transitionConfig, animValue, } = this.state;
        //if (!sharedElementConfig) return;
        if (prevIndex === nextIndex && nextIndex === stack.length - 1) {
            // console.log('renderSharedElementTransitions: null');
            return null;
        }
        const startIndex = Math.min(prevIndex, nextIndex);
        const endIndex = startIndex + 1;
        if (!sharedElementsConfig || !transitionConfig) {
            return;
        }
        const { debug } = transitionConfig;
        const startScreen = sharedElementScreens[startIndex];
        const endScreen = sharedElementScreens[endIndex];
        const nodes = sharedElementsConfig.map((sharedElementConfig) => {
            const { id, otherId } = sharedElementConfig, other = __rest(sharedElementConfig, ["id", "otherId"]);
            const node = Object.assign(Object.assign({ id, start: {
                    node: startScreen ? startScreen.nodes[id] : undefined,
                    ancestor: startScreen ? startScreen.ancestor : undefined,
                }, end: {
                    node: endScreen ? endScreen.nodes[id] : undefined,
                    ancestor: endScreen ? endScreen.ancestor : undefined,
                } }, other), { debug: sharedElementConfig.debug || debug });
            return node;
        });
        // console.log('renderSharedElementTransitions: ', nodes);
        const position = Animated.subtract(animValue, startIndex);
        return (React.createElement(View, { style: styles.sharedElements, pointerEvents: "none" }, nodes.map((_a) => {
            var { id } = _a, other = __rest(_a, ["id"]);
            return (React.createElement(SharedElementTransition, Object.assign({ key: `SharedElementTransition.${id}` }, other, { position: position })));
        })));
    }
    renderBackSwiper() {
        const { nextIndex, prevIndex, stack, width } = this.state;
        if (!nextIndex && !prevIndex && stack.length <= 1) {
            return;
        }
        return (React.createElement(RouterBackSwiper, { width: width, animValue: this._swipeBackAnimValue, prevIndex: prevIndex, nextIndex: nextIndex, onBackSwipe: this.onBackSwipe }));
    }
    render() {
        const { stack, animValue, nextIndex, prevIndex, width, height } = this.state;
        const transitionConfig = this.state.transitionConfig || this.props.transitionConfig;
        return (React.createElement(View, { style: styles.container, onLayout: this.onLayout },
            React.createElement(MaybeScreenContainer, { style: StyleSheet.absoluteFill }, stack.map((node, index) => {
                const isScreenActive = index === nextIndex || index === prevIndex ? 1 : 0;
                return (React.createElement(AnimatedRouterScreen, { key: `screen${index}`, active: isScreenActive, pointerEvents: index === nextIndex ? "auto" : "none", style: [
                        styles.node,
                        transitionConfig.screenInterpolator({
                            layout: {
                                initHeight: height,
                                initWidth: width,
                                //width:
                                //height:
                                //isMeasured
                            },
                            position: animValue,
                            // progress,
                            index,
                            scene: {
                                index,
                                //isActive
                                //isStale
                                //key,
                                //route
                                //descriptor
                            },
                        }),
                    ] },
                    React.createElement(ScreenTransitionContext, { style: StyleSheet.absoluteFill, onSharedElementsUpdated: this.onSharedElementsUpdated }, node)));
            })),
            this.renderSharedElementTransitions(),
            this.renderBackSwiper()));
    }
    push(node, config) {
        const { nextIndex, prevIndex, actionsQueue } = this.state;
        const action = {
            action: "push",
            node,
            config,
        };
        if (nextIndex !== prevIndex) {
            this.setState({
                actionsQueue: [...actionsQueue, action],
            });
        }
        else {
            this.handleAction(action);
        }
    }
    pop(config) {
        const { nextIndex, prevIndex, actionsQueue } = this.state;
        const action = {
            action: "pop",
            config,
        };
        if (nextIndex !== prevIndex) {
            this.setState({
                actionsQueue: [...actionsQueue, action],
            });
        }
        else {
            this.handleAction(action);
        }
    }
    handleAction({ action, config, node }) {
        const { stack, nextIndex, sharedElementScreens } = this.state;
        const transitionConfig = config && config.transitionConfig
            ? config.transitionConfig
            : this.props.transitionConfig;
        const sharedElementsConfig = normalizeSharedElementsConfig(config ? config.sharedElements : undefined);
        if (action === "push") {
            this.setState({
                stack: [...stack, node],
                nextIndex: nextIndex + 1,
                sharedElementScreens: [...sharedElementScreens, undefined],
                sharedElementsConfig,
                transitionConfig,
            });
            const { transitionSpec } = transitionConfig;
            const anim = transitionSpec.animation === "timing"
                ? Animated.timing(this._animValue, Object.assign(Object.assign({}, transitionSpec.config), { toValue: stack.length }))
                : Animated.spring(this._animValue, Object.assign(Object.assign({}, transitionSpec.config), { toValue: stack.length }));
            anim.start(({ finished }) => {
                if (finished) {
                    this.pruneStack(stack.length + 1);
                }
            });
        }
        else {
            if (stack.length <= 1) {
                return;
            }
            this.setState({
                nextIndex: nextIndex - 1,
                transitionConfig,
                sharedElementsConfig,
            });
            const { transitionSpec } = transitionConfig;
            const anim = transitionSpec.animation === "timing"
                ? Animated.timing(this._animValue, Object.assign(Object.assign({}, transitionSpec.config), { toValue: stack.length - 2 }))
                : Animated.spring(this._animValue, Object.assign(Object.assign({}, transitionSpec.config), { toValue: stack.length - 2 }));
            anim.start(({ finished }) => {
                if (finished) {
                    this.pruneStack(stack.length - 1);
                }
            });
        }
    }
    pruneStack(count) {
        const { stack, nextIndex, prevIndex, sharedElementScreens } = this.state;
        let { actionsQueue } = this.state;
        let onComplete;
        if (actionsQueue.length) {
            const action = actionsQueue[0];
            actionsQueue = actionsQueue.slice(0);
            actionsQueue.splice(0, 1);
            onComplete = () => this.handleAction(action);
        }
        if (stack.length > count) {
            this.setState({
                stack: stack.slice(0, count),
                sharedElementScreens: sharedElementScreens.slice(0, count),
                prevIndex: nextIndex,
                actionsQueue,
            }, onComplete);
        }
        else if (nextIndex !== prevIndex) {
            this.setState({
                prevIndex: nextIndex,
                actionsQueue,
            }, onComplete);
        }
    }
    static push(node, config) {
        return router.push(node, config);
    }
    static pop(config) {
        return router.pop(config);
    }
}
Router.defaultProps = {
    transitionConfig: fromRight(),
};
