import toggleSubtree from '../toggleSubtree';
import { allOptions, apples, cats, dogs, fruits, hamsters, oranges } from './options';

it('should handle undefined selection', () => {
  const newSelection = toggleSubtree(fruits, undefined);
  expect(newSelection).toHaveLength(1);
  expect(newSelection).toEqual(expect.arrayContaining([fruits]));
});

it('should select when nothing is selected', () => {
  const newSelection = toggleSubtree(fruits, [cats, dogs, hamsters]);
  expect(newSelection).toHaveLength(4);
  expect(newSelection).toEqual(expect.arrayContaining([fruits, cats, dogs, hamsters]));
});

it('should deselect', () => {
  const newSelection = toggleSubtree(fruits, [fruits, dogs, hamsters]);
  expect(newSelection).toHaveLength(2);
  expect(newSelection).toEqual(expect.arrayContaining([dogs, hamsters]));
});

it('should remove all child items from selection', () => {
  const newSelection = toggleSubtree(fruits, [apples, oranges, cats, dogs, hamsters]);
  expect(newSelection).toHaveLength(4);
  expect(newSelection).toEqual(expect.arrayContaining([fruits, cats, dogs, hamsters]));
});

it('should remove deep child selection', () => {
  const newSelection = toggleSubtree(allOptions, [apples, dogs, hamsters]);
  expect(newSelection).toHaveLength(1);
  expect(newSelection).toEqual(expect.arrayContaining([allOptions]));
});

it('should select root', () => {
  const newSelection = toggleSubtree(allOptions, undefined);
  expect(newSelection).toHaveLength(1);
  expect(newSelection).toEqual([allOptions]);
});

it('should deselect root', () => {
  const newSelection = toggleSubtree(allOptions, [allOptions]);
  expect(newSelection).toBeUndefined();
});
