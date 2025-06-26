import * as React from 'react';
import { useRef } from "react";
import { FlatList,Modal, useWindowDimensions, View, type ImageSourcePropType, type ImageStyle, type StyleProp, type ViewProps } from "react-native";
import SharedImage from "./SharedImage";
import { useNavigation } from '@react-navigation/native';
import { PagerScreen } from './PagerScreen';

interface Props extends ViewProps {
    images: ImageSourcePropType[],
    uniqueImageId?: string,
    imageStyle?: StyleProp<ImageStyle>
}

const ImagesCarousel = (props: Props) => {
    const [uid, setUid] = React.useState("beliuberds");
    const [m, setM] = React.useState(null);
    const navigation = useNavigation<any>();
    const flatListRef = useRef<FlatList | null>(null);
    const { width } = useWindowDimensions();
    const openGallery = (index: number) => {
        // navigation.navigate("Pager", {
        //     images: props.images,
        //     index,
        //     uid,
        // });
        setM({
            images: props.images,
            index,
            uid,
        });
    }

    return (
        <>
        <FlatList
            {...props}
            ref={flatListRef}
            data={props.images}
            keyExtractor={(item, index) => index}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <View style={{ width, alignItems: 'center' }}>
                    <SharedImage
                        source={item}
                        onPress={() => openGallery(index)}
                        uniqueImageId={`${uid}.${index}`}
                        style={{ width: width * 0.9, height: 200, borderRadius: 10 }}
                        resizeMode="cover"
                    />
                </View>
            )}
        />
         <Modal
          animationType="slide"
          transparent={true}
          visible={m != null ? true : false}
          style={{position:'absolute', flex:1}}
          onRequestClose={() => {
          }}>
            {/* <View style={{width:300, height: 300, backgroundColor: 'green'}}> */}

            {/* </View> */}
            <PagerScreen {...m}/>
        </Modal>
        </>
    )
}
export default ImagesCarousel;