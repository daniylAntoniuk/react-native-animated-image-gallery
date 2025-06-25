import { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
  useWindowDimensions,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import {
  NavBar,
  Colors,
  Router,
  useNavBarHeight,
} from "./components";
import { fadeIn } from "./transitions";
import { Hero, SharedElementsConfig } from "./types";
import React from "react";
import { SharedElement } from "react-navigation-shared-element";
// import PagerView, { PagerViewOnPageScrollEventData } from "react-native-pager-view";
// import { ExpandingDot } from "react-native-animated-pagination-dots";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";

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
  hero: Hero;
  navigation: any;
  route: any
};

export function PagerScreen(props: Props) {
  const { navigation } = props;
  const { images } = props.route?.params;
  const initialHero = props.route.params?.hero ?? props.hero;
  const globId = props.route.params?.id;
  const initialIndex = initialHero.id;
  const [hero, setHero] = useState(() => initialHero);
  //navigation.setOptions({ tabBarStyle: { display: 'none' },tabBarItemStyle: { display: "none" } })
  StatusBar.setTranslucent(false);
  StatusBar.setBackgroundColor(Colors.dark)
  StatusBar.setBarStyle("light-content");
  const [dismissAnimValue] = useState(() => new Animated.Value(0));
  const [onDismissGestureEvent] = useState(() =>
    Animated.event([{ nativeEvent: { translationY: dismissAnimValue } }], {
      useNativeDriver: true,
    })
  );

  const [width, setWidth] = useState(() => Dimensions.get("window").width);
  const navBarHeight = useNavBarHeight();

  const onLayout = useCallback(
    (event: any) => setWidth(event.nativeEvent.layout.width),
    [setWidth]
  );

  const onBack = useCallback(() => {
    if (navigation) {
      navigation.goBack();
    } else {
      Router.pop({
        sharedElements: [`heroPhoto.${hero.id}`],
        transitionConfig: fadeIn(),
      });
    }
  }, [navigation, hero]);

  const onDismissGestureStateChange = useCallback(
    (event: any) => {
      const { nativeEvent } = event;
      
      if (nativeEvent.state !== State.END ) {
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
            id={`${props.route?.params.wishType}.heroPhoto.${globId}.${id}`}
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
          <ImageZoom containerStyle={{ backgroundColor: Colors.dark, height: "100%", position: "absolute", flex: 1 }} style={{//flex: 1,
            //width: width,
            // zIndex:1,
            // position:"absolute",
            // height: 225,
            flex: 1,
            //position: "absolute",
            width: width,
            height: "100%",
            resizeMode: "contain",
            //position: "absolute",
            //resizeMode: "contain"
          }} uri={photo} />
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
  console.log("images", images)
  const onItemSelected = useCallback(
    (index: number) => {
      const newHero = images[index];
      if (newHero === hero) return;
      setHero(newHero);
      //if (navigation) navigation.setParams({ hero: newHero });
    },
    [navigation, hero, setHero]
  );

  return (

    <View style={styles.container} onLayout={onLayout}>
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
        <NavBar back="close" light title={hero.id + 1 + "/" + images.length} onBack={onBack} />
      </Animated.View>
      {Platform.OS=="ios" ?
        <PanGestureHandler
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
        : <PanGestureHandler
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
            {/* <ViewPager
              style={styles.flex}
              data={images}
              initialItemIndex={initialIndex}
              renderItem={renderItem}
              getItemLayout={getItemLayout}
              onItemSelected={onItemSelected}
            /> */}

          </Animated.View>
        </PanGestureHandler>}
    </View>
  );
}

PagerScreen.sharedElements = (
  navigation: any,
  route: any,
  otherNavigation: any,
  showing: boolean
): SharedElementsConfig | void => {
  const hero = navigation.route.params.hero;
  const id = navigation.route.params.id;
  const wishType = navigation.route.params.wishType;
  return [`${wishType}.heroPhoto.${id}.${hero.id}`];
};