import * as React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  Animated,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import TouchableScale from "react-native-touchable-scale";

import { Heroes } from "./assets";
import {
  Router,
  NavBar,
  Colors,
  Shadows,
  Text,
  LinearGradient,
} from "./components";
import { fadeIn, scaleCenter } from "./transitions";
import { Hero, SharedElementsConfig } from "./types";
import { DetailScreen } from "./DetailScreen";
import { SharedElement } from "react-navigation-shared-element";
import PagerView, { PagerViewOnPageScrollEventData } from "react-native-pager-view";
// import {
//   ExpandingDot,
// } from 'react-native-animated-pagination-dots';
import ExpandingDot from "../custom/Dot/ExpandingDot";
import MaskedView from "@react-native-masked-view/masked-view";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: Colors.empty,
  },
  avatarList: {
    flex: 1,
    backgroundColor: Colors.empty,
  },
  item: {
    height: 230,
    //borderColor: Colors.back,
    //borderRightWidth: 2,
    //borderBottomWidth: 2,
  },
  itemOdd: {
    borderRightWidth: 0,
  },
  image: {
    height: 225,

    width: Dimensions.get("screen").width //- 40,
  },
  avatar: {
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cardListContentContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  cardContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  cardBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.back,
    borderRadius: 20,
    ...Shadows.elevation1,
  },
  cardImage: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 200,
    width: "100%",
    overflow: "hidden",
  },
  cardImage2: {
    borderRadius: 20,
    height: 360,
    width: "100%",
    resizeMode: "cover",
    overflow: "hidden",
  },
  cardGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
    justifyContent: "flex-end",
  },
  cardFooter: {
    flexDirection: "column",
    padding: 16,
  },
  cardName: {
    alignSelf: "flex-start",
  },
  cardDescription: {
    marginTop: 4,
  },
  cardQuote: {},
  row: { flexDirection: 'row' },
  line: { height: 14, width: 140, marginTop: 6, },
  category: { height: 38, marginHorizontal: 5, backgroundColor: "#1788FC14", borderRadius: 150, marginVertical: 4, paddingVertical: 3 },
  pagerView2: {
    marginTop: 10,
    flex: 1,

    //backgroundColor: "#292929CC"
  },
  pagerItem: {
    flex: 1,
    //paddingHorizontal: 20,
    paddingVertical: 25
  },
  dotContainer: {
    //justifyContent: 'flex-end',
    //marginTop: 10,
    alignSelf: 'flex-start',
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

type PropsType = {
  type: "tile" | "card" | "card2" | "avatar";
  height?: number;
  title: string;
  images?: [];
  id: number;
  wishType?: number;
  DetailComponent: any;
  transitionConfig: any;
  navigation?: any;
};

type StateType = {
  width: number;
  height: number;
};

export class TilesScreen extends React.Component<PropsType, StateType> {
  static defaultProps = {
    type: "tile",
    title: "Tiles",
    DetailComponent: DetailScreen,
    transitionConfig: scaleCenter(),
  };

  state = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  };

  render() {
    const { title, navigation } = this.props;
    const globId = this.props.id;
    const type = this.props.type;

    return (

      <View style={[styles.flex, {}]} onLayout={this.onLayout}>

        {/* {!navigation ? <NavBar title={title} /> : undefined} */}
        <MapImages height={this.props.height} renderItem={this.renderItem} images={this.props.images} />

      </View>
    );
  }

  onLayout = (event: any) => {
    //const { width, height } = event.nativeEvent.layout;
    if (this.state.width !== Dimensions.get("screen").width || this.state.height !== Dimensions.get("screen").height) {
      this.setState({
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      });
    }
  };

  keyExtractor = (item: any) => item.id;

  renderItem = (data: any) => {
    const { navigation } = this.props;
    const type = this.props.type;
    switch (type) {
      case "tile":
        return this.renderTile(data);
      // case "avatar":
      //   return this.renderAvatar(data);
      // case "card":
      //   return this.renderCard(data);
      // case "card2":
      //   return this.renderCard2(data);
      default:
        return null;
    }
  };

  renderTile = ({ item, index }: any) => {
    const { navigation } = this.props;
    const { width } = this.state;
    const hero = item;
    //console.log("DDDDDDDDDDDDDDDDDDDDS", item);
    return (
      <TouchableOpacity
        key={`Hero${hero.id}`}
        delayPressIn={1000}
        style={[
          styles.item,
          //index % 2 ? styles.itemOdd : undefined,
          {
            width: Dimensions.get("screen").width,// - 40,
            alignItems: "flex-start"
          },
          this.props.height ? { height: this.props.height + 5 } : {},]}
        activeOpacity={1}
        onPress={() => this.onPressItem(hero)}
      >
        <SharedElement
          id={`${this.props.wishType}.heroPhoto.${this.props.id}.${hero.id}`}
          style={styles.flex}
        //navigation={navigation}
        >
          {Platform.OS == "ios" ?
            <Image style={[styles.image, this.props.height ? { height: this.props.height } : {}]} source={{ uri: hero.photo }} resizeMethod="scale" resizeMode="cover" />
            :
            <Image style={[styles.image, this.props.height ? { height: this.props.height } : {},]} source={{ uri: hero.photo }} resizeMethod="scale" resizeMode="cover" />
          }
        </SharedElement>
        <SharedElement
          id={`heroPhotoOverlay.${hero.id}`}
          style={StyleSheet.absoluteFill}
        //navigation={navigation}
        >
          <View style={StyleSheet.absoluteFill} collapsable={false} />
        </SharedElement>
      </TouchableOpacity>
    );
  };
  onPressItem = (hero: Hero) => {
    const { navigation, DetailComponent } = this.props;
    const type = this.props.type;
    const transitionConfig = fadeIn();
    let sharedElements: SharedElementsConfig = [];

    const props: any = {
      hero,
      type,
    };
    let routeName = "Detail";
    switch (type) {
      case "tile":
        sharedElements = [`heroPhoto.${this.props.id}.${hero.id}`];
        routeName = "Pager";
        break;
      case "avatar":
        sharedElements = [
          {
            otherId: `heroBackground.${hero.id}`,
            id: `heroPhoto.${hero.id}`,
            animation: "fade-in",
          },
          `heroPhoto.${hero.id}`,
          {
            otherId: `heroName.${hero.id}`,
            id: `heroPhoto.${hero.id}`,
            animation: "fade-in",
          },
          {
            otherId: `heroDescription.${hero.id}`,
            id: `heroPhoto.${hero.id}`,
            animation: "fade-in",
          },
          { id: `heroCloseButton.${hero.id}`, animation: "fade" },
        ];
        routeName = "Card";
        break;
      case "card":
        sharedElements = [
          `heroBackground.${hero.id}`,
          `heroPhoto.${hero.id}`,
          { id: `heroCloseButton.${hero.id}`, animation: "fade" },
          `heroName.${hero.id}`,
          {
            id: `heroDescription.${hero.id}`,
            animation: "fade",
            resize: "none",
            align: "left-top",
          },
        ];
        routeName = "Card";
        break;
      case "card2":
        sharedElements = [
          `heroBackground.${hero.id}`,
          `heroPhoto.${hero.id}`,
          { id: `heroGradientOverlay.${hero.id}`, animation: "fade" },
          { id: `heroCloseButton.${hero.id}`, animation: "fade" },
          { id: `heroName.${hero.id}`, animation: "fade" },
          {
            id: `heroDescription.${hero.id}`,
            animation: "fade",
            resize: "clip",
            align: "left-top",
          },
        ];
        routeName = "Card";
        break;
    }

    if (navigation) {
      //navigation.navigate("Catalog", { screen: "Animate", params: { screen: "SingleHousingScreen", params: { id: el.id } } })
      navigation.navigate("Catalog", {
        screen: routeName,
        params: {
          //...props,
          images: this.props.images?.map((el: any, index: number) => ({ photo: el, id: index })),
          //transitionConfig,
          //sharedElements,
          hero,
          id: this.props.id,
          wishType: this.props.wishType
        }


      });
    } else {
      Router.push(<DetailComponent {...props} />, {
        sharedElements,
        transitionConfig,
      });
    }
  };
}
function MapImages(props: any) {
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, 2];
  const { height, width } = useWindowDimensions();

  //const width = Dimensions.get('window').width;

  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, 2 * width],
  });
  const onPageScroll = React.useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const ref = React.useRef<PagerView>(null);
  const scrollRef = React.useRef<ScrollView>(null);
  const [page, setPage] = React.useState(0);
  const [last, setLast] = React.useState(false);
  // const [arr, setArr] = React.useState([]);
  let arr = [];
  return (
    <>
      <View style={[styles.pagerView2, props.height ? { height: props.height } : { height: 225 }, { marginBottom: 15, width: Dimensions.get("window").width }]}>
        {/*style={styles.pagerView} source={require("../../../assets/img/image_car.png")}> */}
        <PagerView onPageSelected={(e) => {
          if(e.nativeEvent.position!=0){
            scrollRef.current?.scrollTo({
              x: arr.find((x) => x.index == e.nativeEvent.position).x - (width / 2),
              y: 0,
              animated: true,
            }); 

          }
        }} onPageScroll={onPageScroll}
          style={{ flex: 1 }} initialPage={0}>
          {props.images?.map((el: any, index: number) => props.renderItem({ item: { photo: el, id: index }, index }))}
        </PagerView>
      </View>
      <View >
          <MaskedView
            style={{ position:"absolute",  top:-30 ,height:10, width:width,justifyContent:"center", alignItems:"center",}}
            maskElement={
              <>
              <LinearGradient style={{ position:"relative",  height:10,}} start={{x: 0.1, y: 0}} end={{x: 0, y: 0}} colors={['white', 'transparent']}  />
              </>
            }
          >
          <MaskedView
            style={{ position:"absolute", top:0 ,height:10,justifyContent:"center", alignItems:"center", width:width}}
            maskElement={
              <>
              <LinearGradient style={{ position:"relative",  height:10,}} start={{x: 0.9, y: 0}} end={{x: 1, y: 0}} colors={['white', 'transparent']}  />
              </>
            }
          >
            {/* <View style={{width:40, height:20, backgroundColor:"red",position:"absolute", left:0, top:0 }}></View> */}
        <ScrollView showsHorizontalScrollIndicator={false} scrollEnabled={!true} ref={scrollRef} horizontal contentContainerStyle={{}} style={{flex:1, position: "absolute", top: 0, }}>

          {/* <View style={[ { position: "relative",  }]}> */}
            <ExpandingDot
              //marginHorizontal={3}
              data={props.images?.map((el: any, index: number) => (index))!}
              // activeDotColor={'#282E3A'}

              // dotStyle={{
              //   borderColor: "white",
              //   borderWidth: 0.4,
              //   width:30,
              //   height:5,
              //   //opacity: 0,
              //   position: "relative",
              //   backgroundColor: 'transparent',
              // }}
              containerStyle={{ position: "relative",  top: 0, }}
              activeDotColor={'white'}
              dotStyle={[{
                borderColor: "white",
                borderWidth: 1,
                position: "relative",
                //opacity: 0,
                backgroundColor: 'transparent',
              }]}
              onL={(e, index) => {
                const layout = e.nativeEvent.layout;
                //const nA = JSON.parse(JSON.stringify(arr));
                arr.push({ x: layout.x, index });
                //setArr(nA);
                console.log("effefefefe3fef")
              }}
              //@ts-ignore
              scrollX={scrollX}
              //expandingDotWidth={30}

              dotSize={14}
            />
          {/* </View> */}
        </ScrollView>
          </MaskedView>
          </MaskedView>
      </View>

    </>
  )
}