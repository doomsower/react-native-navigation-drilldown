import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { WhitePortal } from 'react-native-portal';
import { StackNavigatorConfig, TabNavigatorConfig } from 'react-navigation';
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

export interface DrilldownScreenOptions {
  HeaderRight?: React.ComponentType;
  screenStyle?: StyleProp<ViewStyle>;
  navigationOptions?: StackNavigatorConfig & TabNavigatorConfig;
}

const DefaultHeaderRight = () => <Icon source={CHECK_ICON} />;

export const createDrilldownScreen = (options: DrilldownScreenOptions = {}) => {
  const {
    HeaderRight = DefaultHeaderRight,
    screenStyle,
    navigationOptions,
  } = options;

  const DrilldownScreen: StatelessScreen<{}, DrilldownScreenParams> = ({ navigation }) => {
    const params = navigation.state.params;
    const portalName = params ? (params.drilldownItemId || params.rootPortalName) : 'root';
    const rootDrilldownScreenKey = (params && params.rootDrilldownScreenKey) || navigation.state.key;
    return (
      <View style={[StyleSheet.absoluteFill, screenStyle]}>
        <WhitePortal name={`drilldownPortal_${portalName}`} childrenProps={{ rootDrilldownScreenKey }} />
      </View>
    );
  };

  DrilldownScreen.navigationOptions = ({ navigation }) => {
    const params = navigation.state.params;
    const rootDrilldownScreenKey = params && params.rootDrilldownScreenKey;
    const multi = !!params && !!params.multi;
    return {
      title: 'Select item',
      headerRight: multi ? (
        <MultiselectDone
          back={navigation.goBack}
          rootDrilldownScreenKey={rootDrilldownScreenKey}
        >
          <HeaderRight />
        </MultiselectDone>
      ) : (null as any),
      ...navigationOptions,
    };
  };

  return DrilldownScreen;
};
