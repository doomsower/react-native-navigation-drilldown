import * as React from 'react';
import PlatformTouchable from 'react-native-platform-touchable';
import { WhitePortal } from 'react-native-portal';

export interface MultiselectDoneProps {
  portalName: string;
  back: any;
  rootDrilldownScreenKey: string;
}

// tslint:disable-next-line:no-var-requires
const CHECK_ICON = require('./icons/check.png');

export default class MultiselectDone extends React.PureComponent<MultiselectDoneProps> {
  onPress = () => this.props.back(this.props.rootDrilldownScreenKey);

  render() {
    const { portalName } = this.props;
    return (
      <PlatformTouchable onPress={this.onPress}>
        <WhitePortal name={`drilldownPortal_${portalName}_done_button`}/>
      </PlatformTouchable>
    );
  }
}
