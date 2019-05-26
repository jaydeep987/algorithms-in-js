import { Graph } from '../graph/graph';
import { MinHeap } from '../heap/min-heap-obj';
import { Base } from '../utils/runner';

export class Dijkstra extends Graph implements Base {

  public findShortestPath(startNode: string, endNode: string) {
    const heap = new MinHeap();
    const relaxedNodes: RelaxedNodes = {};
    const visitedNodes = [];
    let nodeToVisit = startNode;
    let visitedNode = endNode;
    const shortPath = [];

    if (startNode === endNode) {
      return [startNode];
    }

    Object.keys(this.adjList).forEach((vertex) => {
      relaxedNodes[vertex] = {
        weight: Infinity,
        parent: undefined,
      };
    });

    // First node should be 0
    relaxedNodes[startNode].weight = 0;

    while (nodeToVisit) {
      if (visitedNodes.indexOf(nodeToVisit) !== -1) continue;
      let nextNode;

      this.adjList[nodeToVisit].forEach((edge) => {
        const sum = relaxedNodes[nodeToVisit].weight + edge.weight;

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

    console.log('Relaxed nodes', relaxedNodes);

    // Now find shortest path to endNode

    // If invalid node or node is still infinity that means there is no shortest path
    if (!relaxedNodes[endNode] || relaxedNodes[endNode].weight === Infinity) {
      return null;
    }

    shortPath.push(endNode);

    while (visitedNode = relaxedNodes[visitedNode].parent) {
      shortPath.push(visitedNode);
    }

    return shortPath.reverse();
  }

  public run() {
    console.log();
    console.log('Running Dijkstra algorithm ...');
    console.log();

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
    this.addEdge('3', '4', 11)
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

    console.log('Shortest path from 1 to 6 is', shortestPath);

    shortestPath = this.findShortestPath('1', '7');
    console.log('Shortest path from 1 to 7 is', shortestPath);

    shortestPath = this.findShortestPath('1', '1');
    console.log('Shortest path from 1 to 1 is', shortestPath);
  }
}

interface RelaxedNodes {
  [key: string]: {
    weight: number;
    parent: string;
  }
}