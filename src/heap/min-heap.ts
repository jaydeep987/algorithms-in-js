import * as signale from 'signale';

import { swapArrayItem } from '../utils/basic-utils';
import { Base } from '../utils/runner';

/**
 * Min heap for literal values
 */
export class MinHeap implements Base {
  /** The heap */
  protected heap: number[];

  constructor() {
    this.heap = [];
  }

  /**
   * Inserts new value in heap
   */
  insert(value: number): void {
    if (!value) { return; }

    this.heap.push(value);
    let index = this.heap.length - 1;
    let parent = Math.ceil(index / 2) - 1;

    while (parent >= 0 && value < this.heap[parent]) {
      swapArrayItem(this.heap, index, parent);
      index = parent;
      parent = Math.ceil(index / 2) - 1;
    }
  }

  /**
   * Removes root value which is minimum of all values and heapify rest of tree
   */
  remove(): number | undefined {
    if (!this.heap.length) { return undefined; }
    const removed = this.heap[0];

    // Bring last element to first
    this.heap[0] = this.heap[this.heap.length - 1];
    // Reduce size of array
    this.heap = this.heap.slice(0, this.heap.length - 1);

    // compare elements downward and bring minimum at root
    let index = 0;
    let child1;
    let child2;

    while (true) {
      child1 = index * 2 + 1;
      child2 = index * 2 + 2;

      if (!this.heap[child1]) {
        break;
      }

      if (this.heap[child2]) {
        if (this.heap[child1] < this.heap[child2] && this.heap[child1] < this.heap[index]) {
          swapArrayItem(this.heap, child1, index);
          index = child1;
        } else if (this.heap[child2] < this.heap[index]) {
          swapArrayItem(this.heap, child2, index);
          index = child2;
        } else {
          break;
        }
      } else {
        if (this.heap[child1] < this.heap[index]) {
          swapArrayItem(this.heap, child1, index);
          index = child1;
        } else {
          break;
        }
      }
    }

    return removed;
  }

  // tslint:disable:no-magic-numbers
  /**
   * Runs various test
   */
  run(): void {
    this.heap = [];

    signale.log();
    signale.watch('inserting in heap ..');
    // insert
    this.insert(10);
    this.insert(15);
    signale.debug(this.heap);
    this.insert(20);
    signale.debug(this.heap);
    this.insert(12);
    signale.debug(this.heap);
    this.insert(18);
    signale.debug(this.heap);
    this.insert(16);
    signale.debug(this.heap);
    this.insert(17);
    signale.debug(this.heap);
    this.insert(5);

    signale.debug(this.heap);

    signale.watch('Removing from heap from root always');

    signale.log();
    let removed;
    removed = this.remove();
    signale.debug(`Removed root => ${removed}`);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root => ${removed}`);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root => ${removed}`);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root => ${removed}`);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root => ${removed}`);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root => ${removed}`);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root => ${removed}`);
    signale.debug(this.heap);
    signale.debug('Insert 2');
    this.insert(2);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root => ${removed}`);
    signale.debug(this.heap);
    removed = this.remove();
    signale.debug(`Removed root => ${removed}`);
    signale.debug(this.heap);
  }
  // tslint:enable:no-magic-numbers
}
