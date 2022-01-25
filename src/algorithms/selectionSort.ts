import { exchange } from '@/utils/sort';

export function selectionSort(arr: number[]) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    let minIndex = i;

    for (var j = i + 1; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }

    exchange(arr, i, minIndex);
  }

  return arr;
}
