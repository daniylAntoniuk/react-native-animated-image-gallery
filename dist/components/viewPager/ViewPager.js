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
        this.state = {
            selectedIndex: props.initialItemIndex || 0,
        };
    }
    render() {
        const { style, data, initialItemIndex, renderItem, getItemLayout } = this.props;
        return (React.createElement(FlatList, { style: style, horizontal: true, pagingEnabled: true, data: data, initialScrollIndex: initialItemIndex, renderItem: renderItem, getItemLayout: getItemLayout, keyExtractor: this.keyExtractor, onViewableItemsChanged: this.onViewableItemsChanged, viewabilityConfig: VIEWABILITY_CONFIG }));
    }
}
