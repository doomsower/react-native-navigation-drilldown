import { DrilldownItemProps, DrilldownSelection } from './types';

// tslint:disable-next-line:no-inferrable-types
function isSelected(item: DrilldownItemProps, selected: DrilldownSelection = [], recursive: boolean = true): boolean {
  return Array.isArray(selected) ?
    selected.some(i =>
      i.id === item.id ||
      recursive && !!item.children && item.children.some(child => isSelected(child, selected)),
    ) :
    selected.id === item.id;
}

export default isSelected;
