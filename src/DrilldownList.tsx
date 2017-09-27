import * as React from 'react';
import { FlatList, View } from 'react-native';
import { BlackPortal } from 'react-native-portal';
import includesAll from './includesAll';
import includesSelected from './includesSelected';
import ItemView from './ItemView';
import toggleSubtree from './toggleSubtree';
import { DEFAULT_ROUTE_NAME, DrilldownItemProps, DrilldownListProps } from './types';
import updateSelection from './updateSelection';

const ITEM_HEIGHT = 48;

const KEY_EXTRACTOR = (item: DrilldownItemProps) => item.id;

export interface State {
  drilledItem: DrilldownItemProps | null;
}

export default class DrilldownList extends React.PureComponent<DrilldownListProps, State> {
  state: State = { drilledItem: null };

  getItemLayout = (data: any, index: number) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index });

  onItemSelected = (item: DrilldownItemProps) => {
    const { onChange, value, multi, goBack } = this.props;
    if (onChange) {
      onChange(updateSelection(item, value, !!multi));
    }
    if (!multi) {
      goBack(this.props.rootDrilldownScreenKey);
    }
  };

  onItemDrilled = (drilledItem: DrilldownItemProps) => {
    const { multi, navigate, rootDrilldownScreenKey, routeName = DEFAULT_ROUTE_NAME } = this.props;
    this.setState(
      { drilledItem },
      () => navigate(routeName, { drilldownItemId: drilledItem.id, rootDrilldownScreenKey, multi }),
    );
  };

  onHeaderPress = (item: DrilldownItemProps) => {
    const { onChange, value } = this.props;
    if (onChange) {
      const newSelection = toggleSubtree(item, value as DrilldownItemProps[]);
      onChange(newSelection);
    }
  };

  renderHeader = () => {
    const { itemView, itemViewProps, options, multi, displayCategoryToggles, nonLeafMapper, value } = this.props;
    const ItemViewComponent = itemView || ItemView;
    const selfSelected = includesAll(options, value);
    if (!multi || !displayCategoryToggles) {
      return null as any as React.ReactElement<any>;
    }
    const item = nonLeafMapper ? { ...options, ...nonLeafMapper(options) } : options;
    return (
      <ItemViewComponent
        {...itemViewProps}
        isLeaf
        item={item}
        selfSelected={selfSelected}
        subtreeSelected={false}
        onPress={this.onHeaderPress}
      />
    );
  };

  renderListItem = ({ item }: {item: DrilldownItemProps}) => {
    const { itemView, itemViewProps, options, value } = this.props;
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
