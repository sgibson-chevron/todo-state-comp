import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as TodoItemActions from './todo-item.actions';
import { TodoItem } from '../model/todo-item';

export const todoItemsFeatureKey = 'todoItems';

export interface State extends EntityState<TodoItem> {
  todos: TodoItem[];
}

export const adapter: EntityAdapter<TodoItem> = createEntityAdapter<TodoItem>();

export const initialState: State = adapter.getInitialState({
  todos: [],
});

export const reducer = createReducer(
  initialState,
  on(TodoItemActions.addTodoItem, (state, action) =>
    adapter.addOne(action.todoItem, state)
  ),
  on(TodoItemActions.upsertTodoItem, (state, action) =>
    adapter.upsertOne(action.todoItem, state)
  ),
  on(TodoItemActions.addTodoItems, (state, action) =>
    adapter.addMany(action.todoItems, state)
  ),
  on(TodoItemActions.upsertTodoItems, (state, action) =>
    adapter.upsertMany(action.todoItems, state)
  ),
  on(TodoItemActions.updateTodoItem, (state, action) =>
    adapter.updateOne(action.todoItem, state)
  ),
  on(TodoItemActions.updateTodoItems, (state, action) =>
    adapter.updateMany(action.todoItems, state)
  ),
  on(TodoItemActions.deleteTodoItem, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(TodoItemActions.deleteTodoItems, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(TodoItemActions.loadTodoItems, (state, action) =>
    adapter.setAll(action.todoItems, state)
  ),
  on(TodoItemActions.clearTodoItems, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
