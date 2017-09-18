import { DrilldownItemProps } from './types';

export default function isChildOf(child: DrilldownItemProps, parent: DrilldownItemProps): boolean {
  return !!parent.children && parent.children.some(item => item.id === child.id || isChildOf(item, child));
}
