import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { WhitePortal } from 'react-native-portal';
import { NavigationStackScreenOptions, NavigationTabScreenOptions } from 'react-navigation';
import Icon from './Icon';
import { CHECK_ICON } from './icons';
import MultiselectDone from './MultiselectDone';

export interface DrilldownScreenParams {
  multi?: boolean;
  drilldownItemId?: string;
  rootPortalName?: string;
  rootDrilldownScreenKey?: string;
}

export interface DrilldownScreenOptions {
  HeaderRight?: React.ComponentType;
  screenStyle?: StyleProp<ViewStyle>;
  navigationOptions?: NavigationStackScreenOptions & NavigationTabScreenOptions;
}

const DefaultHeaderRight = () => <Icon source={CHECK_ICON} />;

export const createDrilldownScreen = (options: DrilldownScreenOptions = {}) => {
  const {
    HeaderRight = DefaultHeaderRight,
    screenStyle,
    navigationOptions,
  } = options;

  // NavigationScreenComponent<DrilldownScreenParams>
  const DrilldownScreen: any = ({ navigation }: any) => {
    const params = navigation.state.params;
    const portalName = params ? (params.drilldownItemId || params.rootPortalName) : 'root';
    const rootDrilldownScreenKey = (params && params.rootDrilldownScreenKey) || navigation.state.key;
    return (
      <View style={[StyleSheet.absoluteFill, screenStyle]}>
        <WhitePortal name={`drilldownPortal_${portalName}`} childrenProps={{ rootDrilldownScreenKey }} />
      </View>
    );
  };

  DrilldownScreen.navigationOptions = ({ navigation }: any) => {
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
