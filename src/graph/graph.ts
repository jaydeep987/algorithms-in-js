import * as signale from 'signale';

import { Base } from '../utils/runner';

// tslint:disable:no-magic-numbers

export interface AdjList {
  [key: string]: Edge[];
}

export interface Edge {
  /** To vertex */
  toVertexLabel: string;
  /** Weight of vertex */
  weight?: number;
}

/**
 * Graph data structure allows here to create, insert, remove operations of graph
 */
export class Graph implements Base {
  /**
   * Adjacency list
   */
  protected adjList: AdjList;

  constructor() {
    this.adjList = {};
  }

  /**
   * Add new vertex
   */
  addVertex(vertexLabel: string): void {
    this.adjList[vertexLabel] = [];
  }

  /**
   * Add new edge between two vertices with optional weight
   */
  addEdge(fromVertex: string, toVertex: string, weight?: number): void {
    this.adjList[fromVertex].push({
      toVertexLabel: toVertex,
      weight,
    });
  }

  /**
   * Generate adjacency list from given 2D matrix
   */
  generateFromMatrix(matrix: number[][]): void {
    if (!matrix) {
      return;
    }

    matrix.forEach((fromVertices, indexFrom) => {
      this.addVertex(`${indexFrom}`);
      fromVertices.forEach((toVertex, indexTo) => {
        if (toVertex === 1) {
          this.addEdge(`${indexFrom}`, `${indexTo}`);
        }
      });
    });
  }

  /**
   * Clear adjacency list
   */
  clear(): void {
    this.adjList = {};
  }

  /**
   * Breadth first search traversal
   */
  bfsTraverse(startVertex: string = '1'): void {
    const listSize = Object.keys(this.adjList).length;

    if (!listSize) {
      return;
    }

    const traversedVertices: string[] = [];
    let index = 0;

    traversedVertices.push(startVertex);

    while (index <= listSize - 1) {
      this.adjList[traversedVertices[index]].forEach((edge) => {
        if (traversedVertices.indexOf(edge.toVertexLabel) === -1) {
          traversedVertices.push(edge.toVertexLabel);
        }
      });
      index = index + 1;
    }

    signale.debug('BFS Traversal path:');
    signale.debug(traversedVertices.join(' -> '));
  }

  /**
   * Depth first search traversal
   */
  dfsTraverse(startVertex: string = '1'): void {
    const visited = [startVertex];
    const traverse = (vertex: string) => {
      const edges = this.adjList[vertex];
      edges.forEach((edge) => {
        const toVertexLabel = edge.toVertexLabel;
        if (visited.indexOf(toVertexLabel) === -1) {
          visited.push(toVertexLabel);
          traverse(toVertexLabel);
        }
      });
    };

    traverse(startVertex);

    signale.debug('BFS Traversal path:');
    signale.debug(visited.join(' -> '));
  }

  /**
   * Runs various tests
   */
  run(): void {
    // feed data via matrix
    const matrix = [
      [0, 1, 0, 1, 0],
      [1, 0, 1, 1, 1],
      [0, 1, 0, 0, 1],
      [1, 1, 0, 0, 1],
      [0, 1, 1, 1, 0],
    ];
    this.generateFromMatrix(matrix);

    signale.log();
    signale.watch('Graph generated via matrix');
    signale.watch('BFS Traverse, start vertex: 0');
    this.bfsTraverse('0');
    signale.watch('DFS Traverse, start vertex: 0');
    this.dfsTraverse('0');

    // clear
    this.clear();

    // feed data
    ['1', '2', '3', '4', '5'].forEach((vertex) => {
      this.addVertex(vertex);
    });

    this.addEdge('1', '2', 50);
    this.addEdge('1', '4', 10);
    this.addEdge('1', '3', 45);
    this.addEdge('2', '4', 15);
    this.addEdge('2', '3', 10);
    this.addEdge('3', '5', 30);
    this.addEdge('4', '1');
    this.addEdge('4', '5', 15);
    this.addEdge('5', '2', 20);
    this.addEdge('5', '3', 35);

    signale.log();
    signale.watch('Graph generated via direct entries');
    // run all methods
    signale.watch('BFS Traverse, defaul vertex: 1');
    this.bfsTraverse();
    signale.watch('BFS Traverse, given vertex: 5');
    this.bfsTraverse('5');

    signale.watch('DFS Traverse, defaul vertex: 1');
    this.dfsTraverse();
    signale.watch('DFS Traverse, given vertex: 5');
    this.dfsTraverse('5');
  }
}
