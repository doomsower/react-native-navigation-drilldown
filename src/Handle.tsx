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
    const { leftIcon, leftIconStyle, leftIconProps, renderLeftIcon } = this.props;
    if (renderLeftIcon) {
      return React.cloneElement(
        renderLeftIcon(leftIcon),
        { ...leftIconProps, style: [leftIconProps && leftIconProps.style, leftIconStyle] },
      );
    } else if (leftIcon) {
      const source = typeof leftIcon === 'string' ? { uri: leftIcon } : leftIcon;
      return (
        <Icon wrapperStyle={leftIconStyle} {...leftIconProps} source={source} />
      );
    }
    return null;
  };

  renderTitle = () => {
    const { title, titleStyle, titleProps, renderTitle } = this.props;
    if (renderTitle) {
      return React.cloneElement(
        renderTitle(title),
        { ...titleProps, style: [titleProps && titleProps.style, titleStyle] },
      );
    }
    return (
      <Text {...titleProps} style={[styles.wideText, titleStyle]}>{title}</Text>
    );
  };

  renderRightIcon = () => {
    const {
      rightIcon,
      rightIconStyle,
      rightIconProps,
      renderRightIcon,
    } = this.props;
    if (renderRightIcon) {
      return React.cloneElement(
        renderRightIcon(rightIcon),
        { ...rightIconProps, style: [rightIconProps && rightIconProps.style, rightIconStyle] },
      );
    } else if (rightIcon) {
      const source = typeof rightIcon === 'string' ? { uri: rightIcon } : rightIcon;
      return (
        <Icon wrapperStyle={rightIconStyle} {...rightIconProps} source={source} />
      );
    }
    return null;
  };

  render() {
    return (
      <PlatformTouchable onPress={this.props.onPress}>
        {this.renderContent()}
      </PlatformTouchable>
    );
  }
}
