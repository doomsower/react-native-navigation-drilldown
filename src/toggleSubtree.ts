import isChildOf from './isChildOf';
import { DrilldownItemProps, DrilldownSelection } from './types';

function toggleSubtree(subtree: DrilldownItemProps, selection?: DrilldownItemProps[]): DrilldownSelection {
  if (!selection) {
    return [subtree];
  }
  const filtered: DrilldownItemProps[] = [];
  let selfFound = false;
  for (const item of selection) {
    if (item.id === subtree.id) {
      selfFound = true;
    } else if (!isChildOf(item, subtree)) {
      filtered.push(item);
    }
  }
  if (!selfFound) {
    filtered.push(subtree);
  }
  return filtered.length ? filtered : null;
}

export default toggleSubtree;
