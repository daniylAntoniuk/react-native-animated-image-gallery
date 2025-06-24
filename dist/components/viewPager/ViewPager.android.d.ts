import * as React from "react";
type PropsType = {
    style?: any;
    data: any[];
    renderItem: (data: {
        item: any;
        index: number;
    }) => any;
    getItemLayout: (item: any, index: number) => any;
    initialItemIndex: number;
    onItemSelected: (index: number) => any;
};
type StateType = object;
export declare class ViewPager extends React.PureComponent<PropsType, StateType> {
    render(): React.JSX.Element;
    onPageSelected: ({ nativeEvent }: any) => void;
}
export {};
