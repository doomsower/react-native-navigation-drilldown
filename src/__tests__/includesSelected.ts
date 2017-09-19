import includesSelected from '../includesSelected';
import { allOptions, apples, fruits } from './options';

describe('single selection mode', () => {
  it('should find', () => {
    expect(includesSelected(apples, apples)).toBe(true);
  });

  it('should not find when selection undefined', () => {
    expect(includesSelected(fruits)).toBe(false);
  });

  it('should not find when children selected', () => {
    expect(includesSelected(fruits, apples)).toBe(false);
  });
});

describe('multiselection mode', () => {
  it('should find selected leaves', () => {
    expect(includesSelected(apples, [apples])).toBe(true);
  });

  it('should be true when children are selected', () => {
    expect(includesSelected(fruits, [apples])).toBe(true);
  });

  it('should be true when deep leaves are selected', () => {
    expect(includesSelected(allOptions, [apples])).toBe(true);
  });

  it('should be false when nothing is selected', () => {
    expect(includesSelected(allOptions)).toBe(false);
  });
});
