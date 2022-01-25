import { exchange } from '@/utils/sort';

export function insertionSort(arr: number[]) {
  var len = arr.length;
  for (var i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] > arr[j - 1]) {
        break;
      } else {
        exchange(arr, j, j - 1);
      }
    }
  }

  return arr;
}
