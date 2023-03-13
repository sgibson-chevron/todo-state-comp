import { Action, createReducer, on } from '@ngrx/store';
import * as SortActions from './sort.actions';
import { ItemSort, updateItemSort } from '../model/item-sort';
import { setSort } from './sort.actions';

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
  on(SortActions.setSort, (state, action) => ({
    sort: updateItemSort(state.sort, action.field),
  }))
);
