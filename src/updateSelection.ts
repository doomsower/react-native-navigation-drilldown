import xorBy = require('lodash/xorBy');
import { DrilldownItemProps } from './types';

type Item = DrilldownItemProps;

const updateSelection = (item: Item, selected: Item | Item[] | undefined, multi: boolean) => {
  if (multi) {
    return updateMultiSelection(item, (selected as Item[]) || []);
  }
  return item;
};

const updateMultiSelection = (item: Item, selected: Item[]): Item[] => {
  return xorBy(selected, [item], 'id');
};

export default updateSelection;
