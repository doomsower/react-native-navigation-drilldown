import flatMapDeep = require('lodash/flatMapDeep');
import { DrilldownSelection } from './types';
import { DrilldownItemProps } from '.';

export default function flattenLeaves(subtree: DrilldownItemProps): DrilldownSelection {
  if (subtree.children) {
    // @ts-ignore
    return flatMapDeep<DrilldownItemProps>(subtree.children, flattenLeaves);
  }
  return subtree;
}
