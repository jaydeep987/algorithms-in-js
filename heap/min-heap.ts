import { Base } from '../utils/runner';
import { swapArrayItem } from '../utils/basic-utils';

export class MinHeap implements Base {
  private heap: number[];

  constructor() {
    this.heap = [];
  }

  insert(value: number) {
    if (!value) return;
  
    this.heap.push(value);
    let index = this.heap.length - 1;
    let parent = Math.ceil(index / 2) - 1;

    while (parent >= 0 && value < this.heap[parent]) {
      swapArrayItem(this.heap, index, parent);
      index = parent;
      parent = Math.ceil(index / 2) - 1;
    }
  }

  remove() {
    if (!this.heap.length) return;
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
      child1 = 2 * index + 1;
      child2 = 2 * index + 2;

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

  public run() {
    this.heap = [];

    console.log();
    console.log('inserting in heap');
    // insert
    this.insert(10);
    this.insert(15);
    console.log(this.heap);
    this.insert(20);
    console.log(this.heap);
    this.insert(12);
    console.log(this.heap);
    this.insert(18);
    console.log(this.heap);
    this.insert(16);
    console.log(this.heap);
    this.insert(17);
    console.log(this.heap);
    this.insert(5);

    console.log(this.heap);

    console.log('Removing from heap from root always');

    console.log();
    let removed;
    removed = this.remove();
    console.log(`Removed root => ${removed}`);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root => ${removed}`);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root => ${removed}`);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root => ${removed}`);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root => ${removed}`);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root => ${removed}`);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root => ${removed}`);
    console.log(this.heap);
    console.log('Insert 2');
    this.insert(2);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root => ${removed}`);
    console.log(this.heap);
    removed = this.remove();
    console.log(`Removed root => ${removed}`);
    console.log(this.heap);
  }
}
