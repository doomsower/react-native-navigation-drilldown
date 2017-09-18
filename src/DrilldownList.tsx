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
    const { onChange, selected, multi, allowNonLeaves, goBack } = this.props;
    if (onChange) {
      onChange(handleSelection(item, selected, !!multi, !!allowNonLeaves));
    }
    if (!multi) {
      goBack(this.props.rootDrilldownScreenKey);
    }
  };

  onItemDrilled = (drilledItem: DrilldownItemProps) => {
    const { navigate, rootDrilldownScreenKey, routeName = DEFAULT_ROUTE_NAME } = this.props;
    this.setState(
      { drilledItem },
      () => navigate(routeName, { drilldownItemId: drilledItem.id, rootDrilldownScreenKey }),
    );
  };

  renderListItem = ({ item }: {item: DrilldownItemProps}) => {
    return (
      <ItemView
        key={item.id}
        item={item}
        selected={this.props.selected}
        onSelect={this.onItemSelected}
        onDrill={this.onItemDrilled}
      />
    );
  };

  render(): React.ReactElement<any> {
    const { drilledItem } = this.state;
    const { allowNonLeaves, multi, options } = this.props;
    let data = options.children!;
    if (multi && allowNonLeaves) {
      data = [{ id: options.id, name: options.name }, ...data];
    }
    return (
      <View>
        <FlatList
          data={data}
          extraData={this.props.selected}
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
