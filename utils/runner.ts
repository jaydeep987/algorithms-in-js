import { Graph } from '../graph/graph';
import { MinHeap } from '../heap/min-heap';
import { MinHeap as MinHeapObj } from '../heap/min-heap-obj';
import { Dijkstra } from '../dijkstra/dijkstra';

export interface Base {
  run();
}

export class Runner {
  private algorithms = [
    new Graph(),
    new MinHeap(),
    new MinHeapObj(),
    new Dijkstra(),
  ];

  run() {
    this.algorithms.forEach((algorithm) => {
      algorithm.run();
    });
  }
}
