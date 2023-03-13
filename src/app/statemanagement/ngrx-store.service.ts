import { TodoItemStorage } from '../service/todo-item-storage';
import { Observable, take } from 'rxjs';
import { createTodoItem, TodoItem } from '../model/todo-item';
import { ItemSort } from '../model/item-sort';
import { ItemFilter } from '../model/item-filter.enum';
import { Store } from '@ngrx/store';
import {
  selectFilters,
  selectFiltersFeature,
  selectTodoFeature,
  selectTodoIds,
  selectTodos,
} from './index';
import { map } from 'rxjs/operators';
import * as fromTodoItem from './todo-item.reducer';
import * as filterActions from './filters.actions';
import * as todoActions from './todo-item.actions';
import { Injectable } from '@angular/core';
import { MOCK_TODO_ITEMS } from '../data/mock-data';
import { convertDateToSeconds } from '../model/date-time-seconds';
import { randomId } from '../model/todo-item-functions';

@Injectable()
export class NgrxStoreService implements TodoItemStorage {
  constructor(private store: Store) {}

  allItems$: Observable<TodoItem[]> = this.store.select(selectTodos);
  filter$: Observable<ItemFilter> = this.store.select(selectFilters);
  sort$: Observable<ItemSort>;

  getAllItems$(): Observable<TodoItem[]> {
    return this.store.select(selectTodos);
  }

  addItem(item: Partial<TodoItem>): void {
    this.store
      .select(selectTodoIds)
      .pipe(take(1))
      .subscribe((ids) => {
        this.store.dispatch(
          todoActions.addTodoItem({
            todoItem: {
              ...createTodoItem(randomId()),
              name: item.name,
            },
          })
        );
      });
  }

  getItem(id: string): Observable<TodoItem> {
    return this.store
      .select(selectTodoFeature)
      .pipe(
        map((el: fromTodoItem.State) => el.todos.find((todo) => todo.id === id))
      );
  }

  loadItems(): void {
    this.store.dispatch(
      todoActions.loadTodoItems({ todoItems: MOCK_TODO_ITEMS })
    );
  }

  removeItem(id: string): void {
    this.store.dispatch(todoActions.deleteTodoItem({ id }));
  }

  setFilter(filter: ItemFilter): void {
    this.store.dispatch(filterActions.setFilter({ filter }));
  }

  setSortField(field: string): void {}

  toggleItemCompleted(id: string): void {
    this.store.dispatch(
      todoActions.updateTodoItem({
        todoItem: {
          id: id,
          changes: {
            completedDateTime: convertDateToSeconds(new Date()),
          },
        },
      })
    );
  }
}
