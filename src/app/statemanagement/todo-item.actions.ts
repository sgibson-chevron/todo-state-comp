import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TodoItem } from '../model/todo-item';

export const loadTodoItems = createAction(
  '[TodoItem/API] Load TodoItems',
  props<{ todoItems: TodoItem[] }>()
);

export const addTodoItem = createAction(
  '[TodoItem/API] Add TodoItem',
  props<{ todoItem: TodoItem }>()
);

export const upsertTodoItem = createAction(
  '[TodoItem/API] Upsert TodoItem',
  props<{ todoItem: TodoItem }>()
);

export const addTodoItems = createAction(
  '[TodoItem/API] Add TodoItems',
  props<{ todoItems: TodoItem[] }>()
);

export const upsertTodoItems = createAction(
  '[TodoItem/API] Upsert TodoItems',
  props<{ todoItems: TodoItem[] }>()
);

export const updateTodoItem = createAction(
  '[TodoItem/API] Update TodoItem',
  props<{ todoItem: Update<TodoItem> }>()
);

export const updateTodoItems = createAction(
  '[TodoItem/API] Update TodoItems',
  props<{ todoItems: Update<TodoItem>[] }>()
);

export const deleteTodoItem = createAction(
  '[TodoItem/API] Delete TodoItem',
  props<{ id: string }>()
);

export const deleteTodoItems = createAction(
  '[TodoItem/API] Delete TodoItems',
  props<{ ids: string[] }>()
);

export const clearTodoItems = createAction('[TodoItem/API] Clear TodoItems');
