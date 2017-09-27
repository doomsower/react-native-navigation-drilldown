import flatMapDeep = require('lodash/flatMapDeep');
import { DrilldownItemProps } from '../example/src/drilldown/types';
import { DrilldownSelection } from './types';

export default function flattenLeaves(subtree: DrilldownItemProps): DrilldownSelection {
  if (subtree.children) {
    return flatMapDeep<DrilldownItemProps>(subtree.children, flattenLeaves as any);
  }
  return subtree;
}
