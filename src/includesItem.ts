import { DrilldownItemProps, DrilldownSelection } from './types';

export default function includesItem(item: DrilldownItemProps, selection?: DrilldownSelection) {
  return Array.isArray(selection) ?
    !!selection.find(i => i.id === item.id) :
    (!!selection && selection.id === item.id);
}
