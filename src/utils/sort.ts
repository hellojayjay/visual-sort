export function exchange(arr: number[], i: number, j: number) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
