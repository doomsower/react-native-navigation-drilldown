import differenceBy = require('lodash/differenceBy');
import includesAll from './includesAll';
import isChildOf from './isChildOf';
import { DrilldownItemProps, DrilldownSelection } from './types';

type Item = DrilldownItemProps;

const updateSelection =
  (options: Item, item: Item, selected: DrilldownSelection, multi: boolean): DrilldownSelection => {
    if (multi) {
      return updateMultiSelection(options, item, selected);
    }
    return item;
  };

const updateMultiSelection = (options: Item, item: Item, selected: DrilldownSelection): DrilldownSelection => {
  if (!selected) {
    return [item];
  }
  const selectedArray: Item[] = Array.isArray(selected) ? selected : [selected];
  const xored: Item[] = [];
  let removed = false;
  for (const selectedItem of selectedArray) {
    if (selectedItem.id === item.id) {
      removed = true;
    } else if (!isChildOf(item, selectedItem)) {
      xored.push(selectedItem);
    }
  }
  if (!removed) {
    xored.push(item);
  }
  const result = collapseSubtrees(options, xored);
  return result.length ? result : null;
};

const collapseSubtrees = (options: Item, selected: Item[]) => {
  let result = selected;
  if (options.children) {
    options.children.forEach((subtree) => {
      result = collapseSubtrees(subtree, result);
    });
    if (includesAll(options, result)) {
      result = differenceBy(result, options.children, 'id');
      result.push(options);
    }
  }
  return result;
};

export default updateSelection;
