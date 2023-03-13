import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import * as fromTodoItem from './todo-item.reducer';

export interface State {
  [fromTodoItem.todoItemsFeatureKey]: fromTodoItem.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromTodoItem.todoItemsFeatureKey]: fromTodoItem.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
