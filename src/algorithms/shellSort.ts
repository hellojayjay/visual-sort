import { exchange } from '@/utils/sort';
export function shellSort(arr: number[]) {
  let gap = 1;

  while (gap < Math.floor(arr.length / 2)) {
    gap = gap * 2 + 1;
  }

  while (gap >= 1) {
    for (let i = gap; i < arr.length; i++) {
      for (let j = i; j >= gap; j -= gap) {
        if (arr[j - gap] > arr[j]) {
          exchange(arr, j - gap, j);
        } else {
          break;
        }
      }
    }

    gap = Math.floor(gap / 2);
  }

  return arr;
}
