import addCategoriesAsLeaves from '../addCategoriesAsLeaves';
import { DrilldownItemProps } from '../types';
import { allOptions, apples, fruits } from './options';

let newTree: DrilldownItemProps;

beforeAll(() => {
  newTree = addCategoriesAsLeaves(allOptions);
});

it('should add top-level category', () => {
  expect(newTree.children!.length).toBe(3);
  expect(newTree.children![0]).toEqual(allOptions);
});

it('should add to deeper category', () => {
  const newFruits = newTree.children![1];
  expect(newFruits.children!.length).toBe(4);
  expect(newFruits.children![0]).toEqual(fruits);
  expect(newFruits.children![1]).toEqual(apples);
});

it('should match snapshot', () => {
  expect(newTree).toMatchSnapshot();
});

it('should rename category', () => {
  const renamed = addCategoriesAsLeaves(
    allOptions,
    ({ name, icon }) => ({ name: `All ${name}`, icon: 'all.png' }),
  );
  const newFruits = renamed.children![1];
  expect(newFruits.children![0]).toEqual(expect.objectContaining({ icon: 'all.png', name: 'All Fruits' }));
});
