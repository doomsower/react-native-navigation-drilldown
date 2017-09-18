import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { WhitePortal } from 'react-native-portal';
import Icon from './Icon';
import { CHECK_ICON } from './icons';
import MultiselectDone from './MultiselectDone';
import { StatelessScreen } from './StatelessScreen';

export interface DrilldownScreenParams {
  multi?: boolean;
  drilldownItemId?: string;
  rootPortalName?: string;
  rootDrilldownScreenKey?: string;
}

export const DrilldownScreen: StatelessScreen<{}, DrilldownScreenParams> = ({ navigation }) => {
  const params = navigation.state.params;
  const portalName = params ? (params.drilldownItemId || params.rootPortalName) : 'root';
  const rootDrilldownScreenKey = (params && params.rootDrilldownScreenKey) || navigation.state.key;
  return (
    <View style={StyleSheet.absoluteFill}>
      <WhitePortal name={`drilldownPortal_${portalName}`} childrenProps={{ rootDrilldownScreenKey }} />
    </View>
  );
};

DrilldownScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  const params = navigation.state.params;
  const rootDrilldownScreenKey = params && params.rootDrilldownScreenKey;
  const multi = !!params && !!params.multi;
  return {
    ...navigationOptions,
    title: navigationOptions.title || 'Select item',
    headerRight: multi ? (
      <MultiselectDone
        back={navigation.goBack}
        rootDrilldownScreenKey={rootDrilldownScreenKey}
      >
        {navigationOptions.headerRight === undefined ? <Icon source={CHECK_ICON} /> : navigationOptions.headerRight}
      </MultiselectDone>
    ) : (null as any),
  };
};
