import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ItemFilter } from '../model/item-filter.enum';

export const loadFilters = createAction(
  '[Filters/API] Load Filters',
  props<{ filter: ItemFilter }>()
);

export const addFilters = createAction(
  '[Filters/API] Add Filters',
  props<{ filter: ItemFilter }>()
);

export const upsertFilters = createAction(
  '[Filters/API] Upsert Filters',
  props<{ filter: ItemFilter }>()
);

export const addFilterss = createAction(
  '[Filters/API] Add Filterss',
  props<{ filter: ItemFilter }>()
);

export const upsertFilterss = createAction(
  '[Filters/API] Upsert Filterss',
  props<{ filters: ItemFilter }>()
);

export const updateFilters = createAction(
  '[Filters/API] Update Filters',
  props<{ filter: Update<ItemFilter> }>()
);

export const updateFilterss = createAction(
  '[Filters/API] Update Filterss',
  props<{ filter: Update<ItemFilter>[] }>()
);

export const deleteFilters = createAction(
  '[Filters/API] Delete Filters',
  props<{ id: string }>()
);

export const deleteFilterss = createAction(
  '[Filters/API] Delete Filterss',
  props<{ ids: string[] }>()
);

export const clearFilterss = createAction('[Filters/API] Clear Filterss');
