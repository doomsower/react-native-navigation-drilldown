import * as xorBy from 'lodash.xorby';
import isChildOf from './isChildOf';
import { DrilldownItemProps } from './types';

type Item = DrilldownItemProps;

const updateSelection = (item: Item, selected: Item | Item[] | undefined, multi: boolean, allowNonLeaves?: boolean) => {
  if (multi) {
    return updateMultiSelection(item, (selected as Item[]) || [], allowNonLeaves);
  }
  return item;
};

const updateMultiSelection = (item: Item, selected: Item[], allowNonLeaves?: boolean): Item[] => {
  let filtered = selected;
  if (allowNonLeaves) {
    filtered = selected.filter(i => !isChildOf(i, item));
  }
  return xorBy(filtered, [item], 'id');
};

export default updateSelection;
