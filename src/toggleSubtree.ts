import differenceBy = require('lodash/differenceBy');
import unionBy = require('lodash/unionBy');
import castArray = require('lodash/castArray');
import flattenLeaves from './flattenLeaves';
import includesAll from './includesAll';
import { DrilldownItemProps, DrilldownSelection } from './types';

function toggleSubtree(subtree: DrilldownItemProps, selection?: DrilldownItemProps[]): DrilldownSelection {
  const leaves = flattenLeaves(subtree);
  if (includesAll(subtree, selection)) {
    return differenceBy(selection, castArray(leaves), 'id');
  }
  return unionBy(selection, castArray(leaves), 'id');
}

export default toggleSubtree;
