import { Action, createReducer, on } from '@ngrx/store';
import * as SortActions from './sort.actions';
import { ItemSort } from '../model/item-sort';

export const sortFeatureKey = 'sort';

export interface State {
  sort: ItemSort;
}

export const initialState: State = {
  sort: {
    field: 'createdDateTime',
    ascending: true,
  },
};

export const reducer = createReducer(
  initialState,
  on(SortActions.loadSorts, (state) => state)
);
