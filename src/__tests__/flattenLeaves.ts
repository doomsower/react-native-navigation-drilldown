import flattenLeaves from '../flattenLeaves';
import { allOptions, apples, cats, dogs, hamsters, oranges, pears } from './options';

it('should flatten leaves', () => {
  const leaves = flattenLeaves(allOptions);
  expect(leaves).toHaveLength(6);
  expect(leaves).toEqual(expect.arrayContaining([apples, pears, oranges, cats, dogs, hamsters]));
});
