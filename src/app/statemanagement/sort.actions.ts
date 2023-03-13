import { createAction, props } from '@ngrx/store';
import { TodoItem } from '../model/todo-item';

export const setSort = createAction(
  '[Sort] Set Sort',
  props<{ field: keyof TodoItem }>()
);
