export function swapArrayItem(arr: any[], a: number, b: number) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
