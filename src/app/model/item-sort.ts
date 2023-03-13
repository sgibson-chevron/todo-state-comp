import { TodoItem } from './todo-item';

export interface ItemSort {
  field: keyof TodoItem;
  ascending: boolean;
}

export function updateItemSort(
  itemSort: ItemSort,
  field: keyof TodoItem
): ItemSort {
  return {
    ...itemSort,
    field,
    ascending: field === itemSort.field ? !itemSort.ascending : true,
  };
}
