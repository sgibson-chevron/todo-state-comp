import { createAction, props } from '@ngrx/store';
import { ItemFilter } from '../model/item-filter.enum';

export const setFilter = createAction(
  '[Filter/API] Set Filter',
  props<{ filter: ItemFilter }>()
);

export const clearFilter = createAction('[Filter/API] Clear Filter');
