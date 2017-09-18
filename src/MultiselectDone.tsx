import * as React from 'react';
import PlatformTouchable from 'react-native-platform-touchable';

export interface MultiselectDoneProps {
  back: any;
  rootDrilldownScreenKey: string;
}

export default class MultiselectDone extends React.PureComponent<MultiselectDoneProps> {
  onPress = () => this.props.back(this.props.rootDrilldownScreenKey);

  render() {
    const { children } = this.props;
    return (
      <PlatformTouchable onPress={this.onPress}>
        {children}
      </PlatformTouchable>
    );
  }
}
