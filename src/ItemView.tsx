import * as React from 'react';
import { Handle } from './Handle';
import { ARROW_RIGHT, CHECK_ICON, DONE_ALL_ICON } from './icons';
import { ItemViewProps } from './types';

export default class ItemView extends React.PureComponent<ItemViewProps> {

  onPress = () => {
    const { item, onPress } = this.props;
    onPress(item);
  };

  renderContent = () => {
    const { item, isLeaf, renderContent, selfSelected, subtreeSelected } = this.props;
    return renderContent!(item, isLeaf, selfSelected, subtreeSelected);
  };

  renderTitle = () => {
    const { item, isLeaf, renderTitle, selfSelected, subtreeSelected } = this.props;
    return renderTitle!(item, isLeaf, selfSelected, subtreeSelected);
  };

  renderLeftIcon = () => {
    const { item, isLeaf, renderLeftIcon, selfSelected, subtreeSelected } = this.props;
    return renderLeftIcon!(item, isLeaf, selfSelected, subtreeSelected);
  };

  renderRightIcon = () => {
    const { item, isLeaf, renderRightIcon, selfSelected, subtreeSelected } = this.props;
    return renderRightIcon!(item, isLeaf, selfSelected, subtreeSelected);
  };

  render() {
    const {
      item,
      isLeaf,
      selfSelected,
      subtreeSelected,
      contentStyle,
      contentProps,
      renderContent,
      leftIconStyle,
      leftIconProps,
      renderLeftIcon,
      titleStyle,
      titleProps,
      renderTitle,
      rightIconStyle,
      rightIconProps,
      renderRightIcon,
    } = this.props;
    const title = renderTitle ? undefined : item.name;
    const leftIcon = renderLeftIcon ? undefined : item.icon;
    const rightIcon = renderRightIcon ?
      undefined :
      (selfSelected ?
        CHECK_ICON :
          (isLeaf ? undefined : (subtreeSelected ? DONE_ALL_ICON : ARROW_RIGHT))
      );
    return (
      <Handle
        onPress={this.onPress}
        contentStyle={contentStyle}
        contentProps={contentProps}
        renderContent={renderContent && this.renderContent}
        title={title}
        titleStyle={titleStyle}
        titleProps={titleProps}
        renderTitle={renderTitle && this.renderTitle}
        leftIcon={leftIcon}
        leftIconStyle={leftIconStyle}
        leftIconProps={leftIconProps}
        renderLeftIcon={renderLeftIcon && this.renderLeftIcon}
        rightIcon={rightIcon}
        rightIconStyle={rightIconStyle}
        rightIconProps={rightIconProps}
        renderRightIcon={renderRightIcon && this.renderRightIcon}
      />
    );
  }
}
