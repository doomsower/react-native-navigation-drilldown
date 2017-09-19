import { DrilldownItemProps, ItemMapper } from './types';

const defaultMapper: ItemMapper = i => i;

export default function addCategoriesAsLeaves(tree: DrilldownItemProps, mapCategory?: ItemMapper): DrilldownItemProps {
  const mapper = mapCategory || defaultMapper;
  const categoryLeaf = { ...mapper(tree), id: tree.id, children: tree.children };
  return tree.children ?
    { ...tree, children: [categoryLeaf, ...tree.children.map(child => addCategoriesAsLeaves(child, mapCategory)) ] } :
    tree;
}
