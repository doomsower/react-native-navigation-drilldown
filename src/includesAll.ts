import { DrilldownItemProps, DrilldownSelection } from './types';

export default function includesAll(subtree: DrilldownItemProps, selection?: DrilldownSelection): boolean {
  if (subtree.children) {
    return subtree.children.every(child => includesAll(child, selection));
  }
  return Array.isArray(selection) ?
    !!selection.find(item => item.id === subtree.id) :
    (!!selection && selection.id === subtree.id);
}
