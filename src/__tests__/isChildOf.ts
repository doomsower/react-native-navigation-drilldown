import isChildOf from '../isChildOf';
import { allOptions, apples, fruits, notInTree } from './options';

it('leaves cannot have children', () => {
  expect(isChildOf(apples, apples)).toBe(false);
});

it('should not find', () => {
  expect(isChildOf(notInTree, allOptions)).toBe(false);
});

it('should find direct leaf children', () => {
  expect(isChildOf(apples, fruits)).toBe(true);
});

it('should find direct non-leaf children', () => {
  expect(isChildOf(fruits, allOptions)).toBe(true);
});

it('should find deep children', () => {
  expect(isChildOf(apples, allOptions)).toBe(true);
});
