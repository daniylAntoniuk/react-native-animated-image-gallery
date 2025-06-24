import { useRef } from "react";
import { FlatList, Image, useWindowDimensions, View, type ImageSourcePropType, type ImageStyle, type StyleProp, type ViewProps } from "react-native";

interface Props extends ViewProps {
    images: ImageSourcePropType[],
    uniqueImageId?: string,
    imageStyle?: StyleProp<ImageStyle>
}

const ImagesCarousel = (props: Props) => {
    const flatListRef = useRef<FlatList | null>(null);
    const {width} = useWindowDimensions();
    return (
        <FlatList
            {...props}
            ref={flatListRef}
            data={props.images}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={{ width, alignItems: 'center' }}>
                    <Image
                        source={{ uri: item.uri }}
                        style={{ width: width * 0.9, height: 200, borderRadius: 10 }}
                        resizeMode="cover"
                    />
                </View>
            )}
        />
    )
}
export default ImagesCarousel;