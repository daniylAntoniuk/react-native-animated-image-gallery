import { useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  NavBar,
  Colors,
  useNavBarHeight,
} from "./components";
import { Hero, SharedElementsConfig } from "./types";
import { SharedElement } from "react-navigation-shared-element";
import SharedImage from "./SharedImage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.dark,
  },
  flex: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: Dimensions.get("screen").width,
    resizeMode: "cover",
  },

  row: { flexDirection: 'row' },
  line: { height: 14, width: 140, marginTop: 6, },
  category: { height: 38, marginHorizontal: 5, backgroundColor: "#1788FC14", borderRadius: 150, marginVertical: 4, paddingVertical: 3 },
  pagerView2: {
    marginTop: 10,
    flex: 1,
  },
  pagerItem: {
    flex: 1,
    paddingVertical: 25
  },
  dotContainer: {
    justifyContent: 'flex-end',
    marginTop: 10,
    alignSelf: 'center',
  },
  shadow: {
    borderColor: "rgba(62, 75, 249, 0.08)",
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.50)',
    elevation: 15,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  }
});

type Props = {
  uid?: string;
  index?: number;
  images?:[];
};

export function PagerScreen(props: Props) {
  const navigation = useNavigation();
  const route = useRoute();
  const images = route?.params?.images ?? props.images;
  const initialHero = route.params?.uid ?? props.uid;
  const globId = route.params?.id;
  const initialIndex = route.params?.index ?? props.index;
  const [hero, setHero] = useState(() => initialHero);
  const [currentIndex, setCurrentIndex] = useState(0);

  StatusBar.setTranslucent(false);
  StatusBar.setBackgroundColor(Colors.dark)
  StatusBar.setBarStyle("light-content");
  const [dismissAnimValue] = useState(() => new Animated.Value(0));
  const [onDismissGestureEvent] = useState(() =>
    Animated.event([{ nativeEvent: { translationY: dismissAnimValue } }], {
      useNativeDriver: true,
    })
  );
  const { width } = useWindowDimensions();
  const navBarHeight = useNavBarHeight();


  const onBack = useCallback(() => {
    if (navigation) {
      navigation.goBack();
    }
  }, [navigation, hero]);

  const onDismissGestureStateChange = useCallback(
    (event: any) => {
      const { nativeEvent } = event;

      if (nativeEvent.state !== State.END) {
        return;
      }
      if (Math.abs(nativeEvent.translationY) >= 300) {
        onBack();
      } else {
        Animated.spring(dismissAnimValue, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
    [dismissAnimValue, onBack]
  );

  const getItemLayout = useCallback(
    (item: any, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width]
  );

  const renderItem = useCallback(
    ({ item }: any) => {
      const hero = item;
      const { id, photo } = hero;
      console.log("itemmm", item)
      return (
        <View style={{ width }} key={`item.${item.id}`}>
          <SharedElement
            id={`${route?.params.wishType}.heroPhoto.${globId}.${id}`}
            style={styles.flex}
          //navigation={navigation}
          >
            <Image style={{
              zIndex: 0,
              flex: 1,
              // position: "absolute",
              width: width,
              height: "100%",
              resizeMode: "contain",
              //borderRadius:30,
            }} resizeMode="contain" resizeMethod="scale" source={{ uri: photo }} />
            {/* <> */}

            {/* <Image style={{
                flex: 1,
                width: "100%",
                height: "100%",
                resizeMode: "contain",
                //borderRadius:30,
              }} resizeMode="contain" source={{ uri: photo }} /> */}
            {/* </> */}
          </SharedElement>
          
          {/* <Image style={{
            zIndex:0,
            flex: 1,
            position: "absolute",
            width: width,
            height: "100%",
            resizeMode: "contain",
            //borderRadius:30,
          }} resizeMode="contain" resizeMethod="scale" source={{ uri: photo }} /> */}
        </View>
      );
    },
    [width, navigation]
  );
  const onItemSelected = useCallback(
    (index: number) => {
      const newHero = images[index];
      if (newHero === hero) return;
      setHero(newHero);
      //if (navigation) navigation.setParams({ hero: newHero });
    },
    [navigation, hero, setHero]
  );
  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50, // consider item visible if 50% is visible
  };

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const currentIndex = viewableItems[0].index;
      setCurrentIndex(currentIndex);
    }
  });
  return (

    <View style={styles.container}>
      <StatusBar barStyle="light-content" animated />
      <Animated.View
        style={[
          styles.background,
          {
            opacity: dismissAnimValue.interpolate({
              inputRange: [-400, -300, -50, 50, 300, 400],
              outputRange: [0.6, 0.6, 1, 1, 0.6, 0.6],
            }),
          },
        ]}
      >
        <NavBar back="close" light title={currentIndex + 1 + "/" + images.length} onBack={onBack} />
      </Animated.View>
      <PanGestureHandler
        activeOffsetY={[-50, 50]}
        onGestureEvent={onDismissGestureEvent}
        onHandlerStateChange={onDismissGestureStateChange}
      >
        <Animated.View
          style={[
            styles.flex,
            {
              marginVertical: navBarHeight,
              transform: [
                { translateY: Animated.multiply(dismissAnimValue, 0.5) },
              ],
            },
          ]}
        >
          <FlatList
            data={images}
            keyExtractor={(item, index) => index}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewabilityConfig}
            renderItem={({ item, index }) => (
              <SharedImage
                source={item}
                uniqueImageId={`${initialHero}.${initialIndex}`}
                style={{
                  zIndex: 0,
                  width,
                  height: '100%',
                  resizeMode: "contain"
                }} resizeMode="contain" resizeMethod="scale"
              />
            )}
          />
          {/* <ViewPager
              style={styles.flex}
              data={images}
              initialItemIndex={initialIndex}
              renderItem={renderItem}
              getItemLayout={getItemLayout}
              onItemSelected={onItemSelected}
            /> */}

        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

PagerScreen.sharedElements = (
  navigation: any,
): SharedElementsConfig => {
  const uid = navigation.route.params.uid;
  const id = navigation.route.params.id;
  return [`sharedPhoto.${uid}.${id}`];
};