import { Base } from '../utils/runner';
import { swapArrayItem } from '../utils/basic-utils';

export interface HeapObj {
  key: string | number;
  value: number;
}

export class MinHeap implements Base {
  private heap: HeapObj[];

  constructor() {
    this.heap = [];
  }

  insert(item: HeapObj): void {
    if (!item) return;
  
    this.heap.push(item);
    let index = this.heap.length - 1;
    let parent = Math.ceil(index / 2) - 1;

    while (parent >= 0 && item.value < this.heap[parent].value) {
      swapArrayItem(this.heap, index, parent);
      index = parent;
      parent = Math.ceil(index / 2) - 1;
    }
  }

  remove(key?: string | number): HeapObj {
    if (!this.heap.length) return;

    const indexToRemove = this.findIndex(key) || 0;
    const removed = this.heap[indexToRemove];

    // Bring last element to first
    this.heap[indexToRemove] = this.heap[this.heap.length - 1];
    // Reduce size of array
    this.heap = this.heap.slice(0, this.heap.length - 1);

    // compare elements downward and bring minimum at root
    let index = indexToRemove;
    let child1;
    let child2;

    while (true) {
      child1 = 2 * index + 1;
      child2 = 2 * index + 2;

      if (!this.heap[child1]) {
        break;
      }
  
      if (this.heap[child2]) {
        if (this.heap[child1].value < this.heap[child2].value && this.heap[child1].value < this.heap[index].value) {
          swapArrayItem(this.heap, child1, index);
          index = child1;
        } else if (this.heap[child2].value < this.heap[index].value) {
          swapArrayItem(this.heap, child2, index);
          index = child2;
        } else {
          break;
        }
      } else {
        if (this.heap[child1].value < this.heap[index].value) {
          swapArrayItem(this.heap, child1, index);
          index = child1;
        } else {
          break;
        }
      }
    }

    return removed;
  }

  findIndex(key): number {
    if (!key || this.isEmpty()) return undefined;
    let foundIndex;

    this.heap.some((item, index) => {
      console.log(item.key, key);
      if (item.key === key) {
        foundIndex = index;
      }
      return item.key === key;
    });
    console.log(foundIndex , key);

    return foundIndex;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  hasElement(key): boolean {
    if (this.isEmpty()) return false;

    // @ts-ignore
    return this.heap.find((item) => item.key === key) !== undefined;
  }

  replaceElement(key: string | number, value: number) {
    if (this.isEmpty()) return;

    this.remove(key);
    this.insert({ key, value });
  }

  public run() {
    this.heap = [];

    console.log();
    console.log('inserting in heap');
    // insert
    this.insert({ key: 1, value: 10 });
    this.insert({ key: 2, value: 15 });
    console.log(this.heap);
    this.insert({ key: 3, value: 20 });
    console.log(this.heap);
    this.insert({ key: 4, value: 12 });
    console.log(this.heap);
    this.insert({ key: 5, value: 18 });
    console.log(this.heap);
    this.insert({ key: 6, value: 16 });
    console.log(this.heap);
    this.insert({ key: 7, value: 17 });
    console.log(this.heap);
    this.insert({ key: 8, value: 5 });

    console.log(this.heap);

    console.log('Removing from heap from root always');

    console.log();
    let removed;
    removed = this.remove();
    console.log(`Removed root =>`, removed);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root =>`, removed);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root =>`, removed);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root =>`, removed);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root =>`, removed);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root =>`, removed);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root =>`, removed);
    console.log(this.heap);
    console.log('Insert 2');
    this.insert({ key: 9, value: 2 });
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root =>`, removed);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root =>`, removed);
    console.log(this.heap);

    console.log();
    console.log('Remove by key');

    // insert
    this.insert({ key: 1, value: 10 });
    this.insert({ key: 2, value: 15 });
    this.insert({ key: 3, value: 20 });
    this.insert({ key: 4, value: 12 });
    this.insert({ key: 5, value: 18 });
    this.insert({ key: 6, value: 16 });
    this.insert({ key: 7, value: 17 });
    this.insert({ key: 8, value: 5 });
    console.log(this.heap);

    // remove key
    removed = this.remove(4);
    console.log('Removed => ', removed);
    console.log(this.heap);

    // replace value of key

    this.replaceElement(3, 9);

    console.log(`Replaced 3's value with 9=>`);
    console.log(this.heap);
  }
}
