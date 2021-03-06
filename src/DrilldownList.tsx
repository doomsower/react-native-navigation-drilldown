import * as React from 'react';
import { FlatList, View } from 'react-native';
import { BlackPortal } from 'react-native-portal';
import includesItem from './includesItem';
import includesSelected from './includesSelected';
import ItemView from './ItemView';
import toggleSubtree from './toggleSubtree';
import { DEFAULT_ROUTE_NAME, DrilldownItemProps, DrilldownListProps } from './types';
import updateSelection from './updateSelection';

const ITEM_HEIGHT = 48;

const KEY_EXTRACTOR = (item: DrilldownItemProps) => item.id.toString();

export interface State {
  drilledItem: DrilldownItemProps | null;
}

export default class DrilldownList extends React.PureComponent<DrilldownListProps, State> {
  static defaultProps: Partial<DrilldownListProps> = {
    value: null,
  };

  state: State = { drilledItem: null };

  getItemLayout = (data: any, index: number) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index });

  onItemSelected = (item: DrilldownItemProps) => {
    const { onChange, value = null, multi, goBack, rootOptions } = this.props;
    if (onChange) {
      onChange(updateSelection(rootOptions, item, value, !!multi));
    }
    if (!multi) {
      goBack(this.props.rootDrilldownScreenKey);
    }
  };

  onItemDrilled = (drilledItem: DrilldownItemProps) => {
    const { multi, navigate, rootDrilldownScreenKey, routeName = DEFAULT_ROUTE_NAME } = this.props;
    this.setState(
      { drilledItem },
      () => navigate({
        routeName,
        key: `${rootDrilldownScreenKey}_${drilledItem.id}`,
        params: { drilldownItemId: drilledItem.id, rootDrilldownScreenKey, multi },
      }),
    );
  };

  onHeaderPress = (item: DrilldownItemProps) => {
    const { onChange, value = null } = this.props;
    if (onChange) {
      const newSelection = toggleSubtree(item, value as DrilldownItemProps[]);
      onChange(newSelection);
    }
  };

  renderHeader = () => {
    const { itemView, itemViewProps, options, multi, displayCategoryToggles, value = null } = this.props;
    const ItemViewComponent = itemView || ItemView;
    const selfSelected = includesItem(options, value);
    if (!multi || !displayCategoryToggles) {
      return null as any as React.ReactElement<any>;
    }
    return (
      <ItemViewComponent
        {...itemViewProps}
        isLeaf
        item={options}
        selfSelected={selfSelected}
        subtreeSelected={false}
        onPress={this.onHeaderPress}
      />
    );
  };

  renderListItem = ({ item }: {item: DrilldownItemProps}) => {
    const { itemView, itemViewProps, options, value = null } = this.props;
    const isSelf = item.id === options.id;
    const isLeaf = isSelf || !item.children;
    const ItemViewComponent = itemView || ItemView;
    const subtreeSelected = includesSelected(item, value);
    const selfSelected = Array.isArray(value) ? value.some(i => i.id === item.id) : (!!value && value.id === item.id);
    return (
      <ItemViewComponent
        {...itemViewProps}
        key={item.id}
        item={item}
        isLeaf={isLeaf}
        selfSelected={selfSelected}
        subtreeSelected={subtreeSelected}
        onPress={isLeaf ? this.onItemSelected : this.onItemDrilled}
      />
    );
  };

  render(): React.ReactElement<any> {
    const { drilledItem } = this.state;
    return (
      <View>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={this.props.options.children!}
          extraData={this.props.value}
          getItemLayout={this.getItemLayout}
          renderItem={this.renderListItem}
          keyExtractor={KEY_EXTRACTOR}
        />
        {
          drilledItem &&
          <BlackPortal name={`drilldownPortal_${drilledItem.id}`}>
            <DrilldownList {...this.props} options={drilledItem!} />
          </BlackPortal>
        }
      </View>
    );
  }
}
