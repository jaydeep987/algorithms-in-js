import * as signale from 'signale';
import { Base } from '~utils/runner';

import { Graph } from '../graph/graph';
import { MinHeap } from '../heap/min-heap-obj';

/**
 * Dijkstra's shortest path algorithm.
 * It will extend Graph, so graph related methods get inherited and can be used seamlessly.
 */
export class Dijkstra extends Graph implements Base {

  /**
   * Call this method to find shortest path from `startNode` to `endNode`.
   * It will return array of paths or null if no path found.
   */
  findShortestPath(startNode: string | number, endNode: string | number): Array<string | number> | undefined {
    const heap = new MinHeap();
    const relaxedNodes: RelaxedNodes = {};
    const visitedNodes = [];
    let nodeToVisit: string | number | undefined = startNode;
    let visitedNode: string | number | undefined = endNode;
    const shortPath: Array<string | number> = [];

    if (startNode === endNode) {
      return [startNode];
    }

    Object.keys(this.adjList)
      .forEach((vertex) => {
        relaxedNodes[vertex] = {
          weight: Infinity,
          parent: undefined,
        };
      });

    // First node should be 0
    relaxedNodes[startNode].weight = 0;

    while (nodeToVisit) {
      if (visitedNodes.indexOf(nodeToVisit) !== -1) {
        continue;
      }
      let nextNode;

      this.adjList[nodeToVisit].forEach((edge) => {
        const sum = relaxedNodes[nodeToVisit as string | number].weight + (edge.weight || 0);

        if (sum < relaxedNodes[edge.toVertexLabel].weight) {
          relaxedNodes[edge.toVertexLabel].weight = sum;
          relaxedNodes[edge.toVertexLabel].parent = nodeToVisit;

          if (heap.hasElement(edge.toVertexLabel)) {
            heap.replaceElement(edge.toVertexLabel, sum);
          } else {
            heap.insert({ key: edge.toVertexLabel, value: sum });
          }
        }
      });

      visitedNodes.push(nodeToVisit);
      nextNode = heap.remove();
      nodeToVisit = nextNode && nextNode.key;
    }

    signale.debug('Relaxed nodes');
    signale.debug(relaxedNodes);

    // Now find shortest path to endNode

    // If invalid node or node is still infinity that means there is no shortest path
    if (!relaxedNodes[endNode] || relaxedNodes[endNode].weight === Infinity) {
      return undefined;
    }

    shortPath.push(endNode);

    while (true) {
      visitedNode = relaxedNodes[visitedNode].parent;

      if (!visitedNode) {
        break;
      }

      shortPath.push(visitedNode);
    }

    return shortPath.reverse();
  }

  // tslint:disable:no-magic-numbers
  /**
   * Runs algorithm and various tests
   */
  run(): void {
    signale.log();
    signale.watch('Running Dijkstra algorithm ...');
    signale.log();

    this.addVertex('1');
    this.addVertex('2');
    this.addVertex('3');
    this.addVertex('4');
    this.addVertex('5');
    this.addVertex('6');
    this.addVertex('7');

    this.addEdge('1', '2', 4);
    this.addEdge('1', '3', 3);
    this.addEdge('1', '5', 7);
    this.addEdge('2', '1', 4);
    this.addEdge('2', '3', 6);
    this.addEdge('2', '4', 5);
    this.addEdge('3', '1', 3);
    this.addEdge('3', '2', 6);
    this.addEdge('3', '4', 11);
    this.addEdge('3', '5', 8);
    this.addEdge('4', '2', 5);
    this.addEdge('4', '3', 11);
    this.addEdge('4', '5', 2);
    this.addEdge('4', '6', 2);
    this.addEdge('4', '7', 10);
    this.addEdge('5', '1', 7);
    this.addEdge('5', '3', 8);
    this.addEdge('5', '4', 2);
    this.addEdge('5', '7', 5);
    this.addEdge('6', '4', 2);
    this.addEdge('6', '7', 3);
    this.addEdge('7', '4', 10);
    this.addEdge('7', '5', 5);
    this.addEdge('7', '6', 3);

    let shortestPath = this.findShortestPath('1', '6');

    signale.debug('Shortest path from 1 to 6 is', shortestPath);

    shortestPath = this.findShortestPath('1', '7');
    signale.debug('Shortest path from 1 to 7 is', shortestPath);

    shortestPath = this.findShortestPath('1', '1');
    signale.debug('Shortest path from 1 to 1 is', shortestPath);
  }
  // tslint:enable:no-magic-numbers
}

interface RelaxedNodes {
  [key: string]: {
    /** Calculated Weight of node */
    weight: number;
    /** Parent node of visited node */
    parent: string | number | undefined;
  };
}
