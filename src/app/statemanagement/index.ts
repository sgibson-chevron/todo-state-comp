import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import * as fromTodoItem from './todo-item.reducer';
import * as fromFilters from './filters.reducer';

export interface State {
  [fromTodoItem.todoItemsFeatureKey]: fromTodoItem.State;
  [fromFilters.filterFeatureKey]: fromFilters.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromTodoItem.todoItemsFeatureKey]: fromTodoItem.reducer,
  [fromFilters.filterFeatureKey]: fromFilters.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const selectTodoFeature = createFeatureSelector<fromTodoItem.State>(
  fromTodoItem.todoItemsFeatureKey
);

export const selectFiltersFeature = createFeatureSelector<fromFilters.State>(
  fromFilters.filterFeatureKey
);

export const selectTodoItems = (state: State) => state;

export const selectTodoItem = createSelector(
  selectTodoFeature,
  (featureState: fromTodoItem.State, props: { id: string }) =>
    featureState.todos.find((el) => el.id === props.id)
);
