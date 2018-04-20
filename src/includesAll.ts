import includesItem from './includesItem';
import { DrilldownItemProps, DrilldownSelection } from './types';

export default function includesAll(subtree: DrilldownItemProps, selection?: DrilldownSelection): boolean {
  if (subtree.children) {
    return subtree.children.every(child => includesItem(child, selection));
  }
  return includesItem(subtree, selection);
}
