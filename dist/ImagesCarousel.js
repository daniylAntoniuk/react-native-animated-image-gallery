import { useRef } from "react";
import { FlatList, Image, useWindowDimensions, View } from "react-native";
const ImagesCarousel = (props) => {
    const flatListRef = useRef(null);
    const { width } = useWindowDimensions();
    return (React.createElement(FlatList, Object.assign({}, props, { ref: flatListRef, data: props.images, keyExtractor: (item) => item.id, horizontal: true, pagingEnabled: true, showsHorizontalScrollIndicator: false, renderItem: ({ item }) => (React.createElement(View, { style: { width, alignItems: 'center' } },
            React.createElement(Image, { source: { uri: item.uri }, style: { width: width * 0.9, height: 200, borderRadius: 10 }, resizeMode: "cover" }))) })));
};
export default ImagesCarousel;
