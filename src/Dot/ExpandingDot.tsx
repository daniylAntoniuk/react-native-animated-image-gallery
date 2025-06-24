import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  View,
  type ViewStyle,
} from 'react-native';
export interface ExpandingDotProps {
  data: Array<Object>;
  scrollX: Animated.Value;
  containerStyle: ViewStyle;
  dotStyle: ViewStyle;
  inActiveDotOpacity?: number;
  inActiveDotColor?: string;
  expandingDotWidth?: number;
  activeDotColor?: string;
  onL?: any
}

const ExpandingDot = ({
  scrollX,
  data,
  dotStyle,
  containerStyle,
  inActiveDotOpacity,
  inActiveDotColor,
  expandingDotWidth,
  activeDotColor,
  onL
}: ExpandingDotProps) => {
  const { width } = useWindowDimensions();

  const defaultProps = {
    inActiveDotColor: inActiveDotColor || '#000',
    inActiveDotOpacity: inActiveDotOpacity || 0.5,
    expandingDotWidth: expandingDotWidth || 20,
    dotWidth: (dotStyle.width as number) || 10,
    activeDotColor: activeDotColor || '#347af0',
  };

  return (
    <View pointerEvents={'none'} style={[styles.containerStyle, containerStyle]}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const colour = scrollX.interpolate({
          inputRange,
          outputRange: [
            defaultProps.inActiveDotColor,
            defaultProps.activeDotColor,
            defaultProps.inActiveDotColor,
          ],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [
            defaultProps.inActiveDotOpacity,
            1,
            defaultProps.inActiveDotOpacity,
          ],
          extrapolate: 'clamp',
        });
        const expand = scrollX.interpolate({
          inputRange,
          outputRange: [
            defaultProps.dotWidth,
            defaultProps.expandingDotWidth,
            defaultProps.dotWidth,
          ],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
          onLayout={(e)=>{onL(e,index)}}
            key={`dot-${index}`}
            style={[
              styles.dotStyle,
              dotStyle,
              { width: expand },
              { opacity },
              { backgroundColor: colour },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default ExpandingDot;
