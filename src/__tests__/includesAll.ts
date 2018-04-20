import includesAll from '../includesAll';
import { allOptions, apples, cats, dogs, fruits, hamsters, oranges, pears } from './options';

it('should be false for undefined selection', () => {
  expect(includesAll(fruits, undefined)).toBe(false);
});

it('should be true for one level deep tree', () => {
  expect(includesAll(fruits, [apples, oranges, pears])).toBe(true);
});

it('should be false for one level deep tree', () => {
  expect(includesAll(fruits, [apples, pears])).toBe(false);
});

it('should be false for two level deep tree', () => {
  expect(includesAll(allOptions, [apples, oranges, pears, cats, dogs, hamsters])).toBe(false);
});

