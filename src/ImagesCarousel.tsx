import * as React from 'react';
import { useRef } from "react";
import { FlatList, useWindowDimensions, View, type ImageSourcePropType, type ImageStyle, type StyleProp, type ViewProps } from "react-native";
import SharedImage from "./SharedImage";
import { useNavigation } from '@react-navigation/native';

interface Props extends ViewProps {
    images: ImageSourcePropType[],
    uniqueImageId?: string,
    imageStyle?: StyleProp<ImageStyle>
}

const ImagesCarousel = (props: Props) => {
    const [uid, setUid] = React.useState(crypto.randomUUID())
    const navigation = useNavigation<any>();
    const flatListRef = useRef<FlatList | null>(null);
    const { width } = useWindowDimensions();
    const openGallery = (index: number) => {
        navigation.navigate("Pager", {
            images: props.images,
            index,
            uid,
        });
    }

    return (
        <FlatList
            {...props}
            ref={flatListRef}
            data={props.images}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <View style={{ width, alignItems: 'center' }}>
                    <SharedImage
                        source={{ uri: item.uri }}
                        onPress={() => openGallery(index)}
                        uniqueImageId={`${uid}.${index}`}
                        style={{ width: width * 0.9, height: 200, borderRadius: 10 }}
                        resizeMode="cover"
                    />
                </View>
            )}
        />
    )
}
export default ImagesCarousel;