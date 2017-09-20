import * as React from 'react';
import { FlatList, View } from 'react-native';
import { BlackPortal } from 'react-native-portal';
import ItemView from './ItemView';
import { DEFAULT_ROUTE_NAME, DrilldownItemProps, DrilldownListProps } from './types';
import handleSelection from './updateSelection';

const ITEM_HEIGHT = 48;

const KEY_EXTRACTOR = (item: DrilldownItemProps) => item.id;

export interface State {
  drilledItem: DrilldownItemProps | null;
}

export default class DrilldownList extends React.PureComponent<DrilldownListProps, State> {
  state: State = { drilledItem: null };

  getItemLayout = (data: any, index: number) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index });

  onItemSelected = (item: DrilldownItemProps) => {
    const { onChange, value, multi, allowNonLeaves, goBack } = this.props;
    if (onChange) {
      onChange(handleSelection(item, value, !!multi, !!allowNonLeaves));
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

  renderListItem = ({ item }: {item: DrilldownItemProps}) => {
    const { itemView, itemViewProps, options } = this.props;
    const isSelf = item.id === options.id;
    const isLeaf = isSelf || !item.children;
    const ItemViewComponent = itemView || ItemView;
    return (
      <ItemViewComponent
        {...itemViewProps}
        key={item.id}
        item={item}
        isLeaf={isLeaf}
        selection={this.props.value}
        onPress={isLeaf ? this.onItemSelected : this.onItemDrilled}
      />
    );
  };

  render(): React.ReactElement<any> {
    const { drilledItem } = this.state;
    return (
      <View>
        <FlatList
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
