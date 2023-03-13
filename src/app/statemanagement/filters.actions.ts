import { createAction, props } from '@ngrx/store';
import { ItemFilter } from '../model/item-filter.enum';

export const loadFilter = createAction(
  '[Filter/API] Load Filter',
  props<{ filter: ItemFilter }>()
);

export const setFilter = createAction(
  '[Filter/API] Add Filter',
  props<{ filter: ItemFilter }>()
);

export const clearFilter = createAction('[Filter/API] Clear Filterss');
