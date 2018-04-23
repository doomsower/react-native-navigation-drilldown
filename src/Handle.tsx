import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlatformTouchable from 'react-native-platform-touchable';
import Icon from './Icon';
import { HandleProps } from './types';

const styles = StyleSheet.create({
  wideText: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

export class Handle extends React.PureComponent<HandleProps> {
  renderContent = () => {
    const { contentStyle, contentProps, renderContent } = this.props;
    if (renderContent) {
      return React.cloneElement(
        renderContent(),
        { ...contentProps, style: [contentProps && contentProps.style, contentStyle] },
        this.renderLeftIcon(),
        this.renderTitle(),
        this.renderRightIcon(),
      );
    }
    return (
      <View {...contentProps} style={[styles.container, contentStyle]}>
        {this.renderLeftIcon()}
        {this.renderTitle()}
        {this.renderRightIcon()}
      </View>
    );
  };

  renderLeftIcon = () => {
    const { leftIcon, leftIconStyle, leftIconProps, renderLeftIcon, disabled } = this.props;
    if (renderLeftIcon) {
      return React.cloneElement(
        renderLeftIcon(leftIcon),
        { ...leftIconProps, style: [leftIconProps && leftIconProps.style, leftIconStyle, disabled && styles.disabled] },
      );
    } else if (leftIcon) {
      const source = typeof leftIcon === 'string' ? { uri: leftIcon } : leftIcon;
      return (
        <Icon wrapperStyle={[leftIconStyle, disabled && styles.disabled]} {...leftIconProps} source={source} />
      );
    }
    return null;
  };

  renderTitle = () => {
    const { title, titleStyle, titleProps, renderTitle, disabled } = this.props;
    if (renderTitle) {
      return React.cloneElement(
        renderTitle(title),
        { ...titleProps, style: [titleProps && titleProps.style, titleStyle, disabled && styles.disabled] },
      );
    }
    return (
      <Text {...titleProps} style={[styles.wideText, titleStyle, disabled && styles.disabled]}>{title}</Text>
    );
  };

  renderRightIcon = () => {
    const {
      rightIcon,
      rightIconStyle,
      rightIconProps,
      renderRightIcon,
      disabled,
    } = this.props;
    if (renderRightIcon) {
      return React.cloneElement(
        renderRightIcon(rightIcon),
        { ...rightIconProps, style: [rightIconProps && rightIconProps.style, rightIconStyle, disabled && styles.disabled] },
      );
    } else if (rightIcon) {
      const source = typeof rightIcon === 'string' ? { uri: rightIcon } : rightIcon;
      return (
        <Icon wrapperStyle={[rightIconStyle, disabled && styles.disabled]} {...rightIconProps} source={source} />
      );
    }
    return null;
  };

  render() {
    return (
      <PlatformTouchable disabled={this.props.disabled} onPress={this.props.onPress}>
        {this.renderContent()}
      </PlatformTouchable>
    );
  }
}
