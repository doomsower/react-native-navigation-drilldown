import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlackPortal } from 'react-native-portal';
import DrilldownList from './DrilldownList';
import { Handle } from './Handle';
import { ARROW_RIGHT } from './icons';
import { DEFAULT_ROUTE_NAME, DrilldownProps, DrilldownSelection, IconSource } from './types';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

const getTitle = (noSelectionTitle: string) => (selection?: DrilldownSelection) => {
  if (!selection || Array.isArray(selection) && (selection as any).length === 0) {
    return noSelectionTitle;
  } else if (Array.isArray(selection)) {
    return selection.length > 1 ? `${selection[0].name} (+ ${selection.length - 1} more)` : selection[0].name;
  }
  return selection.name;
};

const getIcon = (noSelectionIcon?: IconSource) => (selection?: DrilldownSelection) => {
  if (!selection || Array.isArray(selection) && (selection as any).length === 0) {
    return noSelectionIcon;
  } else if (Array.isArray(selection)) {
    return selection[0].icon;
  }
  return selection.icon;
};

export class Drilldown extends React.PureComponent<DrilldownProps, any> {
  static defaultProps: Partial<DrilldownProps> = {
    value: null,
  };

  onHandlePress = () => {
    const { multi, name, navigate, routeName = DEFAULT_ROUTE_NAME } = this.props;
    navigate(routeName, { rootPortalName: name, multi });
  };

  render() {
    const { name, icon, label, handle, handleProps, style, disabled, ...listProps } = this.props;
    const { value = null } = listProps;
    const handlePropsObj = (typeof handleProps === 'function') ? handleProps(value) : handleProps;
    const HandleComponent = handle || Handle;
    const handleIcon = typeof icon === 'function' ? icon(value) : getIcon(icon)(value);
    const handleLabel = typeof label === 'function' ? label(value) : getTitle(label)(value);
    return (
      <View style={[styles.container, style]}>
        <HandleComponent
          disabled={disabled}
          rightIcon={ARROW_RIGHT}
          {...handlePropsObj}
          leftIcon={handleIcon}
          title={handleLabel}
          onPress={this.onHandlePress}
        />
        <BlackPortal name={`drilldownPortal_${name}`}>
          <DrilldownList {...listProps} rootOptions={listProps.options} />
        </BlackPortal>
      </View>
    );
  }
}
