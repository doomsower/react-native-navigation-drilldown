import * as React from 'react';
import { Handle } from './Handle';
import { ARROW_RIGHT, CHECK_ICON, DONE_ALL_ICON } from './icons';
import includesSelected from './includesSelected';
import { ItemViewProps } from './types';

export default class ItemView extends React.PureComponent<ItemViewProps> {
  leafSelected: boolean;
  selfSelected: boolean;

  constructor(props: ItemViewProps) {
    super(props);
    this.updateSelection(props);
  }

  componentWillReceiveProps(nextProps: ItemViewProps) {
    if (nextProps.item !== this.props.item || nextProps.selection !== this.props.selection) {
      this.updateSelection(nextProps);
    }
  }

  updateSelection = ({ item, selection = [] }: ItemViewProps) => {
    this.leafSelected = includesSelected(item, selection);
    this.selfSelected = Array.isArray(selection) ? selection.some(i => i.id === item.id) : (selection.id === item.id);
  };

  onPress = () => {
    const { item, onPress } = this.props;
    onPress(item);
  };

  renderContent = () => {
    const { item, renderContent } = this.props;
    return renderContent!(item, this.selfSelected, this.leafSelected);
  };

  renderTitle = () => {
    const { item, renderTitle } = this.props;
    return renderTitle!(item, this.selfSelected, this.leafSelected);
  };

  renderLeftIcon = () => {
    const { item, renderLeftIcon } = this.props;
    return renderLeftIcon!(item, this.selfSelected, this.leafSelected);
  };

  renderRightIcon = () => {
    const { item, renderRightIcon } = this.props;
    return renderRightIcon!(item, this.selfSelected, this.leafSelected);
  };

  render() {
    const {
      item,
      isLeaf,
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
      (this.selfSelected ?
        CHECK_ICON :
          (isLeaf ? undefined : (this.leafSelected ? DONE_ALL_ICON : ARROW_RIGHT))
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
