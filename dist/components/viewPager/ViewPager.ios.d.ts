import * as React from "react";
type PropsType = {
    style: any;
    data: any[];
    renderItem: (data: {
        item: any;
        index: number;
    }) => any;
    getItemLayout: (item: any, index: number) => any;
    initialItemIndex: number;
    onItemSelected: (index: number) => any;
};
type StateType = {
    selectedIndex: number;
    contentOffset: {
        x: number;
        y: number;
    };
};
export declare class ViewPager extends React.PureComponent<PropsType, StateType> {
    constructor(props: PropsType);
    render(): React.JSX.Element;
    keyExtractor: (item: any, index: number) => string;
    onViewableItemsChanged: (event: any) => void;
}
export {};
