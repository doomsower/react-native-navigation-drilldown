import toggleSubtree from '../toggleSubtree';
import { allOptions, apples, cats, dogs, fruits, hamsters, oranges, pears } from './options';

it('should handle undefined selection', () => {
  const newSelection = toggleSubtree(fruits, undefined);
  expect(newSelection).toHaveLength(3);
  expect(newSelection).toEqual(expect.arrayContaining([apples, oranges, pears]));
});

it('should exclude subtree', () => {
  const newSelection = toggleSubtree(fruits, [apples, oranges, pears, cats, dogs, hamsters]);
  expect(newSelection).toHaveLength(3);
  expect(newSelection).toEqual(expect.arrayContaining([cats, dogs, hamsters]));
});

it('should include subtree', () => {
  const newSelection = toggleSubtree(fruits, [cats, dogs, hamsters]);
  expect(newSelection).toHaveLength(6);
  expect(newSelection).toEqual(expect.arrayContaining([apples, oranges, pears, cats, dogs, hamsters]));
});

it('should include deep', () => {
  const newSelection = toggleSubtree(allOptions, [cats, dogs, hamsters]);
  expect(newSelection).toHaveLength(6);
  expect(newSelection).toEqual(expect.arrayContaining([apples, oranges, pears, cats, dogs, hamsters]));
});

it('should exclude deep', () => {
  const newSelection = toggleSubtree(allOptions, [cats, dogs, hamsters, apples, oranges, pears]);
  expect(newSelection).toHaveLength(0);
});
