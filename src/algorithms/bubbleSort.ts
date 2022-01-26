import { exchange } from '@/utils/sort';

export function bubbleSort(arr: number[]) {
  const len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        exchange(arr, j + 1, j);
      }
    }
  }

  return arr;
}
