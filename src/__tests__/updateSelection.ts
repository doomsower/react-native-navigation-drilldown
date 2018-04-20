import updateSelection from '../updateSelection';
import { allOptions, apples, dogs, fruits, oranges, pears, pets } from './options';

describe('single selection mode', () => {
  it('should select', () => {
    expect(updateSelection(allOptions, apples, pears, false)).toEqual(apples);
    expect(updateSelection(allOptions, apples, undefined, false)).toEqual(apples);
  });
});

describe('multi selection mode', () => {
  it('should select first', () => {
    expect(updateSelection(allOptions, apples, undefined, true)).toEqual([apples]);
  });

  it('should add to selection', () => {
    expect(updateSelection(allOptions, apples, [pears], true)).toEqual([pears, apples]);
  });

  it('should remove from selection', () => {
    expect(updateSelection(allOptions, apples, [pears, apples], true)).toEqual([pears]);
  });

  it('should collapse to top level when everything is selected', () => {
    expect(updateSelection(allOptions, oranges, [pears, apples], true)).toEqual([fruits]);
  });

  it('should collapse deep when everything is selected', () => {
    expect(updateSelection(allOptions, oranges, [pears, apples, pets], true)).toEqual([allOptions]);
  });

  it('should drop category when leaf is selected', () => {
    expect(updateSelection(allOptions, oranges, [fruits, dogs], true)).toEqual([dogs, oranges]);
  });

  it('should drop category when deep leaf is selected', () => {
    expect(updateSelection(allOptions, oranges, [allOptions], true)).toEqual([oranges]);
  });
});
