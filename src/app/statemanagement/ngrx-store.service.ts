import { TodoItemStorage } from '../service/todo-item-storage';
import { Observable } from 'rxjs';
import { TodoItem } from '../model/todo-item';
import { ItemSort } from '../model/item-sort';
import { ItemFilter } from '../model/item-filter.enum';
import { Store } from '@ngrx/store';
import { selectFiltersFeature, selectTodoFeature } from './index';
import { map } from 'rxjs/operators';
import * as fromTodoItem from './todo-item.reducer';
import * as filterActions from './filters.actions';
import * as todoActions from './todo-item.actions';
import { Injectable } from '@angular/core';
import { MOCK_TODO_ITEMS } from '../data/mock-data';
import { convertDateToSeconds } from '../model/date-time-seconds';

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
