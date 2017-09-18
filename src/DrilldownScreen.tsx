import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { WhitePortal } from 'react-native-portal';
import MultiselectDone from './MultiselectDone';
import { StatelessScreen } from './StatelessScreen';

export interface DrilldownScreenParams {
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
  const portalName = params ? params.rootPortalName : 'root';
  return {
    title: navigationOptions.title || 'Select item',
    headerRight: (
      <MultiselectDone
        back={navigation.goBack}
        portalName={portalName}
        rootDrilldownScreenKey={rootDrilldownScreenKey}
      />
    ),
  };
};
