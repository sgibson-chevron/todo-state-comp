import * as fromSort from './sort.reducer';
import { selectSortState } from './sort.selectors';

describe('Sort Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSortState({
      [fromSort.sortFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
