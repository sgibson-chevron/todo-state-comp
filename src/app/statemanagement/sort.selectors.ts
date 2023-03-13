import { createFeatureSelector } from '@ngrx/store';
import * as fromSort from './sort.reducer';

export const selectSortState = createFeatureSelector<fromSort.State>(
  fromSort.sortFeatureKey
);
