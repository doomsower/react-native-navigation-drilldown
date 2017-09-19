import updateSelection from '../updateSelection';
import { apples, fruits, pears } from './options';

describe('single selection mode', () => {
  it('should select', () => {
    expect(updateSelection(apples, pears, false)).toEqual(apples);
    expect(updateSelection(apples, undefined, false)).toEqual(apples);
  });
});

describe('multiselection mode', () => {
  it('should select first', () => {
    expect(updateSelection(apples, undefined, true)).toEqual([apples]);
  });

  it('should add to selection', () => {
    expect(updateSelection(apples, [pears], true)).toEqual([pears, apples]);
  });

  it('should remove from selection', () => {
    expect(updateSelection(apples, [pears, apples], true)).toEqual([pears]);
  });

  it('should deselect children when category is selected', () => {
    expect(updateSelection(fruits, [apples, pears], true, true))
      .toEqual([fruits]);
  });

});
