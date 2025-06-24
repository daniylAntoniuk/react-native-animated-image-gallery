import * as React from "react";
import { createNativeWrapper } from "react-native-gesture-handler";
import PagerView from "react-native-pager-view";
// TODO: fix touch events are not routed to the viewpager
const RNGHPagerView = createNativeWrapper(PagerView, {
    disallowInterruption: true,
});
export class ViewPager extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onPageSelected = ({ nativeEvent }) => {
            const { onItemSelected } = this.props;
            if (onItemSelected)
                onItemSelected(nativeEvent.position);
        };
    }
    render() {
        const { style, data, initialItemIndex, renderItem } = this.props;
        return (React.createElement(RNGHPagerView, { style: style, initialPage: initialItemIndex, onPageSelected: this.onPageSelected }, data.map((item, index) => renderItem({
            item,
            index,
        }))));
    }
}
