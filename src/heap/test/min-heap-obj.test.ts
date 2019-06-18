import * as chai from 'chai';
// import * as sinon from 'sinon';
import { MinHeap, HeapObj } from '../min-heap-obj';

const assert = chai.assert;

// Extend Minheap to make heap prop public so that we can test
class ExtendedMinHeap extends MinHeap {
  public heap: HeapObj[];

  constructor() {
    super();
    this.heap = [];
  }
}

describe('Test MinHeap for objects', () => {
  let heap: ExtendedMinHeap;

  before(() => {
    heap = new ExtendedMinHeap();
  });

  it('shoud insert given objects in heap', () => {
    heap.insert({ key: 1, value: 10 });
    assert.deepStrictEqual(heap.heap, [{ key: 1, value: 10 }]);

    heap.insert({ key: 2, value: 15 });
    assert.deepStrictEqual(heap.heap, [{ key: 1, value: 10 }, { key: 2, value: 15 }]);

    heap.insert({ key: 3, value: 20 });
    assert.deepStrictEqual(heap.heap, [
      { key: 1, value: 10 },
      { key: 2, value: 15 },
      { key: 3, value: 20 }
    ]);

    heap.insert({ key: 4, value: 12 });
    assert.deepStrictEqual(heap.heap, [
      { key: 1, value: 10 },
      { key: 4, value: 12 },
      { key: 3, value: 20 },
      { key: 2, value: 15 },
    ]);

    heap.insert({ key: 5, value: 18 });
    assert.deepStrictEqual(heap.heap, [
      { key: 1, value: 10 },
      { key: 4, value: 12 },
      { key: 3, value: 20 },
      { key: 2, value: 15 },
      { key: 5, value: 18 }
    ]);

    heap.insert({ key: 6, value: 16 });
    assert.deepStrictEqual(heap.heap, [
      { key: 1, value: 10 },
      { key: 4, value: 12 },
      { key: 6, value: 16 },
      { key: 2, value: 15 },
      { key: 5, value: 18 },
      { key: 3, value: 20 },
    ]);

    heap.insert({ key: 7, value: 17 });
    assert.deepStrictEqual(heap.heap, [
      { key: 1, value: 10 },
      { key: 4, value: 12 },
      { key: 6, value: 16 },
      { key: 2, value: 15 },
      { key: 5, value: 18 },
      { key: 3, value: 20 },
      { key: 7, value: 17 }
    ]);

    heap.insert({ key: 8, value: 5 });
    assert.deepStrictEqual(heap.heap, [
      { key: 8, value: 5 },
      { key: 1, value: 10 },
      { key: 6, value: 16 },
      { key: 4, value: 12 },
      { key: 5, value: 18 },
      { key: 3, value: 20 },
      { key: 7, value: 17 },
      { key: 2, value: 15 },
    ]);
  });

  it('should remove minimum number every time when call remove and heapify', () => {
    let removed = heap.remove();

    assert.deepStrictEqual(removed, { key: 8, value: 5 });
    assert.deepStrictEqual(heap.heap, [
      { key: 1, value: 10 },
      { key: 4, value: 12 },
      { key: 6, value: 16 },
      { key: 2, value: 15 },
      { key: 5, value: 18 },
      { key: 3, value: 20 },
      { key: 7, value: 17 },
    ]);

    removed = heap.remove();
    assert.deepStrictEqual(removed, { key: 1, value: 10 });
    assert.deepStrictEqual(heap.heap, [
      { key: 4, value: 12 },
      { key: 2, value: 15 },
      { key: 6, value: 16 },
      { key: 7, value: 17 },
      { key: 5, value: 18 },
      { key: 3, value: 20 },
    ]);

    removed = heap.remove();
    assert.deepStrictEqual(removed, { key: 4, value: 12 });
    assert.deepStrictEqual(heap.heap, [
      { key: 2, value: 15 },
      { key: 7, value: 17 },
      { key: 6, value: 16 },
      { key: 3, value: 20 },
      { key: 5, value: 18 },
    ]);

    removed = heap.remove();
    assert.deepStrictEqual(removed, { key: 2, value: 15 });
    assert.deepStrictEqual(heap.heap, [
      { key: 6, value: 16 },
      { key: 7, value: 17 },
      { key: 5, value: 18 },
      { key: 3, value: 20 },
    ]);

    removed = heap.remove();
    assert.deepStrictEqual(removed, { key: 6, value: 16 });
    assert.deepStrictEqual(heap.heap, [
      { key: 7, value: 17 },
      { key: 3, value: 20 },
      { key: 5, value: 18 }
    ]);

    removed = heap.remove();
    assert.deepStrictEqual(removed, { key: 7, value: 17 });
    assert.deepStrictEqual(heap.heap, [
      { key: 5, value: 18 },
      { key: 3, value: 20 },
    ]);

    removed = heap.remove();
    assert.deepStrictEqual(removed, { key: 5, value: 18 });
    assert.deepStrictEqual(heap.heap, [
      { key: 3, value: 20 },
    ]);

    removed = heap.remove();
    assert.deepStrictEqual(removed, { key: 3, value: 20 });
    assert.deepStrictEqual(heap.heap, []);
  });

  it('should return undefined when call remove() and no elements in heap', () => {
    assert.isUndefined(heap.remove());
  });
});
