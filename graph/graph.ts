import { Base } from '../utils/runner';

export interface AdjList {
  [key: string]: Edge[];
}

export interface Edge {
  toVertexLabel: string;
  weight: number;
}

export class Graph implements Base {
  protected adjList: AdjList;

  constructor() {
    this.adjList = {};
  }

  addVertex(vertexLabel: string) {
    this.adjList[vertexLabel] = [];
  }

  addEdge(fromVertex: string, toVertex: string, weight?: number) {
    this.adjList[fromVertex].push({
      toVertexLabel: toVertex,
      weight,
    });
  }

  generateFromMatrix(matrix: number[][]) {
    if (!matrix) return;

    matrix.forEach((fromVertices, indexFrom) => {
      this.addVertex(`${indexFrom}`);
      fromVertices.forEach((toVertex, indexTo) => {
        if (toVertex === 1) {
          this.addEdge(`${indexFrom}`, `${indexTo}`);
        }
      });
    })
  }

  clear() {
    this.adjList = {};
  }

  bfsTraverse(startVertex: string = '1') {
    const listSize = Object.keys(this.adjList).length;
  
    if (!listSize) {
      return;
    }

    const traversedVertices = [];
    let index = 0;

    traversedVertices.push(startVertex);

    while (index <= listSize - 1) {
      this.adjList[traversedVertices[index]].forEach((edge) => {
        if (traversedVertices.indexOf(edge.toVertexLabel) === -1) {
          traversedVertices.push(edge.toVertexLabel);
        }
      });
      index++;
    }

    console.log(traversedVertices.join(' -> '));
  }

  dfsTraverse(startVertex: string = '1') {
    const visited = [startVertex];
    const traverse = (vertex) => {
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
    console.log(visited.join(' -> '));
  }

  run() {
    // feed data via matrix
    const matrix = [
      [0, 1, 0, 1, 0],
      [1, 0, 1, 1, 1],
      [0, 1, 0, 0, 1],
      [1, 1, 0, 0, 1],
      [0, 1, 1, 1, 0]
    ];
    this.generateFromMatrix(matrix);

    console.log();
    console.log('Graph generated via matrix');
    console.log('BFS Traverse, start vertex: 0');
    this.bfsTraverse('0');
    console.log('DFS Traverse, start vertex: 0');
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

    console.log();
    console.log('Graph generated via direct entries');
    // run all methods
    console.log('BFS Traverse, defaul vertex: 1');
    this.bfsTraverse();
    console.log('BFS Traverse, given vertex: 5');
    this.bfsTraverse('5');

    console.log('DFS Traverse, defaul vertex: 1');
    this.dfsTraverse();
    console.log('DFS Traverse, given vertex: 5');
    this.dfsTraverse('5');
  }
}