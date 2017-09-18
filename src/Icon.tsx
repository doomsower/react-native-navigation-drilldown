import * as React from 'react';
import { ImageBackground, ImageBackgroundProperties, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import PlatformTouchable from 'react-native-platform-touchable';

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    width: 24,
    height: 24,
  },
});

export interface IconProps extends ImageBackgroundProperties {
  onPress?: () => void;
  wrapperStyle?: StyleProp<ViewStyle>;
}

const Icon: React.StatelessComponent<IconProps> = ({ onPress, wrapperStyle, ...props }) => onPress ?
  (
    <PlatformTouchable onPress={onPress} style={[styles.icon, wrapperStyle]}>
      <ImageBackground {...props} style={styles.imageBackground} />
    </PlatformTouchable>
  ) :
  (
    <View style={[styles.icon, wrapperStyle]}>
      <ImageBackground {...props} style={styles.imageBackground} />
    </View>
  );

export default Icon;
