import { createReducer, on } from '@ngrx/store';
import * as FiltersActions from './filters.actions';
import { ItemFilter } from '../model/item-filter.enum';

export const filterFeatureKey = 'filter';

export interface State {
  filter: ItemFilter;
}

export const initialState: State = { filter: ItemFilter.ALL };

export const reducer = createReducer(
  initialState,
  on(FiltersActions.setFilter, (state, action) => ({ filter: action.filter })),
  on(FiltersActions.clearFilter, (state) => ({ filter: ItemFilter.ALL }))
);
