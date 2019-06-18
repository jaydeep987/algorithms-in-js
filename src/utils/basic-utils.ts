/**
 * Swaps two items of an array
 */
export function swapArrayItem(arr: any[], a: number, b: number): void {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
