import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlackPortal } from 'react-native-portal';
import DrilldownList from './DrilldownList';
import { Handle } from './Handle';
import { ARROW_RIGHT, CHECK_ICON } from './icons';
import { DEFAULT_ROUTE_NAME, DrilldownItemProps, DrilldownProps } from './types';
import Icon from './Icon';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export class Drilldown extends React.PureComponent<DrilldownProps, any> {
  onHandlePress = () => {
    const { name, navigate, routeName = DEFAULT_ROUTE_NAME } = this.props;
    navigate(routeName, { rootPortalName: name });
  };

  render() {
    const { name, noItemIcon, noItemLabel, doneButton, handle, handleProps, style, ...listProps } = this.props;
    const { multi, selected } = listProps;
    let selectedItem: DrilldownItemProps | null | undefined;
    if (multi) {
      const items = selected as DrilldownItemProps[];
      selectedItem = (items && items.length) ? items[0] : null;
    } else {
      selectedItem = selected as DrilldownItemProps;
    }
    const HandleComponent = handle || Handle;
    const DoneButton = doneButton;
    const topRightButton = multi ? (DoneButton ? <DoneButton /> : <Icon source={CHECK_ICON} />) : undefined;
    const handleIcon = selectedItem ? selectedItem.icon : noItemIcon;
    const handleLabel = selectedItem ? selectedItem.name : noItemLabel;
    return (
      <View style={[styles.container, style]}>
        <HandleComponent
          rightIcon={ARROW_RIGHT}
          {...handleProps}
          leftIcon={handleIcon}
          title={handleLabel}
          onPress={this.onHandlePress}
        />
        <BlackPortal name={`drilldownPortal_${name}`}>
          <DrilldownList {...listProps} />
        </BlackPortal>
        <BlackPortal name={`drilldownPortal_${name}_done_button`}>
          {topRightButton}
        </BlackPortal>
      </View>
    );
  }
}
