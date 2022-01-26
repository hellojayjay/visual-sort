export function mergeSort(arr: number[]): number[] {
  const len = arr.length;

  if (len < 2) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const leftArray = arr.slice(0, middle);
  const rightArray = arr.slice(middle);

  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

function merge(left: number[], right: number[]) {
  const result: number[] = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift()!);
    } else {
      result.push(right.shift()!);
    }
  }

  while (left.length) {
    result.push(left.shift()!);
  }

  while (right.length) {
    result.push(right.shift()!);
  }

  return result;
}
