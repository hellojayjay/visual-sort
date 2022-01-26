export function quickSort(arr: number[]) {
  const low = 0;
  const high = arr.length - 1;
  return quickSortRecursion(arr, low, high);
}

function quickSortRecursion(arr: number[], low: number, high: number) {
  if (low < high) {
    const pivot = partition(arr, low, high);
    quickSortRecursion(arr, low, pivot - 1);
    quickSortRecursion(arr, pivot + 1, high);
  }

  return arr;
}

function partition(arr: number[], low: number, high: number) {
  const pivot = arr[low];

  while (low < high) {
    while (low < high && arr[high] > pivot) {
      high--;
    }
    arr[low] = arr[high];

    while (low < high && arr[low] <= pivot) {
      low++;
    }
    arr[high] = arr[low];

    arr[low] = pivot;
  }

  return low;
}
