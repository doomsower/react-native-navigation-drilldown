declare module 'react-native-platform-touchable' {
  import * as React from 'react';
  import { TouchableNativeFeedbackProperties, TouchableOpacityProperties } from 'react-native';

  type Props = TouchableOpacityProperties & TouchableNativeFeedbackProperties;

  export default class PlatformTouchable extends React.Component<Props> {
  }
}
