import * as React from "react";
import { FlatList } from "react-native";
const VIEWABILITY_CONFIG = {
    minimumViewTime: 0,
    viewAreaCoveragePercentThreshold: 51,
};
export class ViewPager extends React.PureComponent {
    constructor(props) {
        super(props);
        this.keyExtractor = (item, index) => `item${index}`;
        this.onViewableItemsChanged = (event) => {
            const { onItemSelected, data } = this.props;
            const { viewableItems } = event;
            if (!viewableItems.length)
                return;
            const selectedItem = viewableItems[0].item;
            const selectedIndex = data.indexOf(selectedItem);
            if (this.state.selectedIndex !== selectedIndex) {
                this.setState({
                    selectedIndex,
                }, () => {
                    if (onItemSelected)
                        onItemSelected(selectedIndex);
                });
            }
        };
        const { data, getItemLayout, initialItemIndex = 0 } = props;
        const initialOffset = getItemLayout(data[initialItemIndex], initialItemIndex).offset;
        const contentOffset = { x: initialOffset, y: 0 };
        this.state = {
            selectedIndex: initialItemIndex,
            contentOffset,
        };
    }
    render() {
        const { style, data, renderItem, getItemLayout } = this.props;
        const { contentOffset } = this.state;
        return (React.createElement(FlatList, { style: style, horizontal: true, pagingEnabled: true, data: data, initialNumToRender: 10, contentOffset: contentOffset, renderItem: renderItem, getItemLayout: getItemLayout, keyExtractor: this.keyExtractor, onViewableItemsChanged: this.onViewableItemsChanged, viewabilityConfig: VIEWABILITY_CONFIG }));
    }
}
