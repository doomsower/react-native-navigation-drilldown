import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlackPortal } from 'react-native-portal';
import DrilldownList from './DrilldownList';
import { Handle } from './Handle';
import { ARROW_RIGHT } from './icons';
import { DEFAULT_ROUTE_NAME, DrilldownItemProps, DrilldownProps } from './types';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export class Drilldown extends React.PureComponent<DrilldownProps, any> {
  onHandlePress = () => {
    const { multi, name, navigate, routeName = DEFAULT_ROUTE_NAME } = this.props;
    navigate(routeName, { rootPortalName: name, multi });
  };

  render() {
    const { name, noItemIcon, noItemLabel, handle, handleProps, style, ...listProps } = this.props;
    const { multi, value } = listProps;
    let selectedItem: DrilldownItemProps | null | undefined;
    if (multi) {
      const items = value as DrilldownItemProps[];
      selectedItem = (items && items.length) ? items[0] : null;
    } else {
      selectedItem = value as DrilldownItemProps;
    }
    const handlePropsObj = (typeof handleProps === 'function') ? handleProps(value) : handleProps;
    const HandleComponent = handle || Handle;
    const handleIcon = selectedItem ? selectedItem.icon : noItemIcon;
    const handleLabel = selectedItem ? selectedItem.name : noItemLabel;
    return (
      <View style={[styles.container, style]}>
        <HandleComponent
          rightIcon={ARROW_RIGHT}
          {...handlePropsObj}
          leftIcon={handleIcon}
          title={handleLabel}
          onPress={this.onHandlePress}
        />
        <BlackPortal name={`drilldownPortal_${name}`}>
          <DrilldownList {...listProps} />
        </BlackPortal>
      </View>
    );
  }
}
