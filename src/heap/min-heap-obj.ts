import * as signale from 'signale';

import { swapArrayItem } from '../utils/basic-utils';
import { Base } from '../utils/runner';

export interface HeapObj {
  /** Key or label */
  key: string | number;
  /** Value of key by which heap will be managed */
  value: number;
}

/**
 * Min heap for object types
 */
export class MinHeap implements Base {
  /**
   * The heap of objects
   */
  protected heap: HeapObj[];

  constructor() {
    this.heap = [];
  }

  /**
   * Insert new item in heap and heapify the tree
   */
  insert(item: HeapObj): void {
    if (!item) { return; }

    this.heap.push(item);
    let index = this.heap.length - 1;
    let parent = Math.ceil(index / 2) - 1;

    while (parent >= 0 && item.value < this.heap[parent].value) {
      swapArrayItem(this.heap, index, parent);
      index = parent;
      parent = Math.ceil(index / 2) - 1;
    }
  }

  /**
   * Remove item from heap which is root element
   */
  remove(key?: string | number): HeapObj | undefined {
    if (!this.heap.length) { return undefined; }

    const indexToRemove = key && this.findIndex(key) || 0;
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
      child1 = index * 2 + 1;
      child2 = index * 2 + 2;

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

  /**
   * Find index of given key in heap
   */
  findIndex(key: string | number): number | undefined {
    if (!key || this.isEmpty()) { return undefined; }
    let foundIndex;

    this.heap.some((item, index) => {
      if (item.key === key) {
        foundIndex = index;
      }

      return item.key === key;
    });

    return foundIndex;
  }

  /**
   * Checks if heap is empty or not
   */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Checks if heap has object of given key or not
   */
  hasElement(key: string | number): boolean {
    if (this.isEmpty()) { return false; }

    // tslint:disable-next-line
    // @ts-ignore
    return this.heap.find((item) => item.key === key) !== undefined;
  }

  /**
   * Replaces given element's value in heap with given value
   */
  replaceElement(key: string | number, value: number): void {
    if (this.isEmpty()) { return; }

    this.remove(key);
    this.insert({ key, value });
  }

  // tslint:disable:no-magic-numbers
  /**
   * Runs various tests
   */
  run(): void {
    this.heap = [];

    signale.log();
    signale.watch('Inserting in heap ..');
    // insert
    this.insert({ key: 1, value: 10 });
    this.insert({ key: 2, value: 15 });
    signale.debug(this.heap);
    this.insert({ key: 3, value: 20 });
    signale.debug(this.heap);
    this.insert({ key: 4, value: 12 });
    signale.debug(this.heap);
    this.insert({ key: 5, value: 18 });
    signale.debug(this.heap);
    this.insert({ key: 6, value: 16 });
    signale.debug(this.heap);
    this.insert({ key: 7, value: 17 });
    signale.debug(this.heap);
    this.insert({ key: 8, value: 5 });

    signale.debug(this.heap);

    signale.watch('Removing from heap from root always');

    signale.log();
    let removed;
    removed = this.remove();
    signale.debug(`Removed root =>`, removed);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root =>`, removed);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root =>`, removed);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root =>`, removed);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root =>`, removed);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root =>`, removed);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root =>`, removed);
    signale.debug(this.heap);
    signale.debug('Insert 2');
    this.insert({ key: 9, value: 2 });
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root =>`, removed);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root =>`, removed);
    signale.debug(this.heap);

    signale.debug();
    signale.watch('Remove by key');

    // insert
    this.insert({ key: 1, value: 10 });
    this.insert({ key: 2, value: 15 });
    this.insert({ key: 3, value: 20 });
    this.insert({ key: 4, value: 12 });
    this.insert({ key: 5, value: 18 });
    this.insert({ key: 6, value: 16 });
    this.insert({ key: 7, value: 17 });
    this.insert({ key: 8, value: 5 });
    signale.debug(this.heap);

    // remove key
    removed = this.remove(4);
    signale.debug('Removed => ', removed);
    signale.debug(this.heap);

    // replace value of key

    this.replaceElement(3, 9);

    signale.watch(`Replaced 3's value with 9=>`);
    signale.debug(this.heap);
  }
  // tslint:enable:no-magic-numbers
}
