import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as FiltersActions from './filters.actions';
import { ItemFilter } from '../model/item-filter.enum';

export const filterFeatureKey = 'filter';

export interface State extends EntityState<ItemFilter> {
  filter: ItemFilter;
}

export const adapter: EntityAdapter<ItemFilter> =
  createEntityAdapter<ItemFilter>();

export const initialState: State = adapter.getInitialState({
  filter: ItemFilter.ALL,
});

export const reducer = createReducer(
  initialState,
  on(FiltersActions.setFilter, (state, action) =>
    adapter.setOne(action.filter, state)
  ),
  on(FiltersActions.clearFilter, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
