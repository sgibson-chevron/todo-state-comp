import { Action, createReducer, on } from '@ngrx/store';
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
  on(FiltersActions.addFilters, (state, action) =>
    adapter.addOne(action.filter, state)
  ),
  on(FiltersActions.upsertFilters, (state, action) =>
    adapter.upsertOne(action.filter, state)
  ),
  on(FiltersActions.updateFilters, (state, action) =>
    adapter.updateOne(action.filter, state)
  ),
  on(FiltersActions.updateFilterss, (state, action) =>
    adapter.updateMany(action.filter, state)
  ),
  on(FiltersActions.deleteFilters, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(FiltersActions.deleteFilterss, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(FiltersActions.clearFilterss, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
