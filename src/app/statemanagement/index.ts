import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import * as fromTodoItem from './todo-item.reducer';
import * as fromFilters from './filters.reducer';
import * as fromSort from './sort.reducer';
import { TodoItem } from '../model/todo-item';
import { ItemFilter } from '../model/item-filter.enum';
import { sortAndFilterData } from '../model/todo-item-functions';
import { ItemSort } from '../model/item-sort';

export interface State {
  [fromTodoItem.todoItemsFeatureKey]: fromTodoItem.State;
  [fromFilters.filterFeatureKey]: fromFilters.State;
  [fromSort.sortFeatureKey]: fromSort.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromTodoItem.todoItemsFeatureKey]: fromTodoItem.reducer,
  [fromFilters.filterFeatureKey]: fromFilters.reducer,
  [fromSort.sortFeatureKey]: fromSort.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const selectTodoFeature = createFeatureSelector<fromTodoItem.State>(
  fromTodoItem.todoItemsFeatureKey
);

export const selectTodos = createSelector(selectTodoFeature, (state) =>
  fromTodoItem.selectAll(state)
);

export const selectFiltersFeature = createFeatureSelector<fromFilters.State>(
  fromFilters.filterFeatureKey
);

export const selectSortFeature = createFeatureSelector<fromSort.State>(
  fromSort.sortFeatureKey
);

export const selectSort = createSelector(
  selectSortFeature,
  (state) => state.sort
);

export const selectFilters = createSelector(
  selectFiltersFeature,
  (state) => state.filter
);

export const selectFilteredSortedTodos = createSelector(
  selectTodos,
  selectFilters,
  selectSort,
  (todos: TodoItem[], filter: ItemFilter, sort: ItemSort) => {
    return sortAndFilterData(todos, filter, sort);
  }
);

export const selectTodoIds = createSelector(selectTodoFeature, (state) =>
  fromTodoItem.selectIds(state)
);

export const selectTodoItems = (state: State) => state;

export const selectTodoItem = createSelector(
  selectTodoFeature,
  (featureState: fromTodoItem.State, props: { id: string }) =>
    featureState.todos.find((el) => el.id === props.id)
);
