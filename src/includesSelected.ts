import { DrilldownItemProps, DrilldownSelection } from './types';

// tslint:disable-next-line:no-inferrable-types
function includesSelected(item: DrilldownItemProps, selected: DrilldownSelection): boolean {
  if (!selected) {
    return false;
  }
  return Array.isArray(selected) ?
    selected.some(i =>
      i.id === item.id ||
      !!item.children && item.children.some(child => includesSelected(child, selected)),
    ) :
    selected.id === item.id;
}

export default includesSelected;
