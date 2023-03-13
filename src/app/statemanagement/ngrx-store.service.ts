import { TodoItemStorage } from '../service/todo-item-storage';
import { Observable } from 'rxjs';
import { TodoItem } from '../model/todo-item';
import { ItemSort } from '../model/item-sort';
import { ItemFilter } from '../model/item-filter.enum';
import { Store } from '@ngrx/store';
import {
  selectFiltersFeature,
  selectTodoFeature,
  selectTodoItem,
} from './index';
import { map } from 'rxjs/operators';
import * as fromTodoItem from './todo-item.reducer';
import { Injectable } from '@angular/core';

@Injectable()
export class NgrxStoreService implements TodoItemStorage {
  constructor(private store: Store) {}

  allItems$: Observable<TodoItem[]> = this.store
    .select(selectTodoFeature)
    .pipe(map((feature) => feature.todos));
  filter$: Observable<ItemFilter> = this.store
    .select(selectFiltersFeature)
    .pipe(map((feature) => feature.filter));
  sort$: Observable<ItemSort>;

  addItem(item: Partial<TodoItem>): void {}

  getItem(id: string): Observable<TodoItem> {
    return this.store
      .select(selectTodoFeature)
      .pipe(
        map((el: fromTodoItem.State) => el.todos.find((todo) => todo.id === id))
      );
  }

  loadItems(): void {}

  removeItem(id: string): void {}

  setFilter(filter: ItemFilter): void {}

  setSortField(field: string): void {}

  toggleItemCompleted(id: string): void {}
}
