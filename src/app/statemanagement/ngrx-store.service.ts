import { TodoItemStorage } from '../service/todo-item-storage';
import { Observable, take } from 'rxjs';
import { createTodoItem, TodoItem } from '../model/todo-item';
import { ItemSort } from '../model/item-sort';
import { ItemFilter } from '../model/item-filter.enum';
import { Store } from '@ngrx/store';
import {
  selectFilteredSortedTodos,
  selectFilters,
  selectSort,
  selectTodoFeature,
  selectTodoIds,
  selectTodosMap,
} from './index';
import { map } from 'rxjs/operators';
import * as fromTodoItem from './todo-item.reducer';
import * as filterActions from './filters.actions';
import * as sortActions from './sort.actions';
import * as todoActions from './todo-item.actions';
import { Injectable } from '@angular/core';
import { MOCK_TODO_ITEMS } from '../data/mock-data';
import { convertDateToSeconds } from '../model/date-time-seconds';
import { randomId } from '../model/todo-item-functions';
import { Dictionary } from '@ngrx/entity';

@Injectable()
export class NgrxStoreService implements TodoItemStorage {
  constructor(private store: Store) {}

  allItems$: Observable<TodoItem[]> = this.store.select(
    selectFilteredSortedTodos
  );
  filter$: Observable<ItemFilter> = this.store.select(selectFilters);
  sort$: Observable<ItemSort> = this.store.select(selectSort);

  addItem(item: Partial<TodoItem>): void {
    this.store
      .select(selectTodoIds)
      .pipe(take(1))
      .subscribe((ids) => {
        this.store.dispatch(
          todoActions.addTodoItem({
            todoItem: {
              ...createTodoItem(randomId(ids.map((id) => id.toString()))),
              name: item.name,
            },
          })
        );
      });
  }

  getItem(id: string): Observable<TodoItem> {
    return this.store
      .select(selectTodosMap)
      .pipe(map((todos: Dictionary<TodoItem>) => todos[id]));
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

  setSortField(field: keyof TodoItem): void {
    this.store.dispatch(sortActions.setSort({ field }));
  }

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
