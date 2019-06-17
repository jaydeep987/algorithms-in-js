import { Dijkstra } from '../dijkstra/dijkstra';
import { Graph } from '../graph/graph';
import { MinHeap } from '../heap/min-heap';
import { MinHeap as MinHeapObj } from '../heap/min-heap-obj';

export interface Base {
  /** A method to run all tests for particular algorithm */
  run(): void;
}

/**
 * Runner which will run tests of all algorithms
 */
export class Runner {
  /** All algorithms */
  private readonly algorithms = [
    new Graph(),
    new MinHeap(),
    new MinHeapObj(),
    new Dijkstra(),
  ];

  /**
   * Start running
   */
  run(): void {
    this.algorithms.forEach((algorithm) => {
      algorithm.run();
    });
  }
}
