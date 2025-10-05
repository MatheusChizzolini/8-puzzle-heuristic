import type { Node } from "../types/node";
import { getHeuristic } from "./get-heuristic";
import { PriorityQueue } from "./priority-queue";

function getChildren(board: number[]): number[][] {
  const children: number[][] = [];
  const size = 3;
  const zeroIndex = board.indexOf(0);
  const row = Math.floor(zeroIndex / size);
  const col = zeroIndex % size;
  const moves = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];
  for (const [r, c] of moves) {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      const newIndex = r * size + c;
      const newBoard = [...board];
      [newBoard[zeroIndex], newBoard[newIndex]] = [
        newBoard[newIndex],
        newBoard[zeroIndex],
      ];
      children.push(newBoard);
    }
  }

  return children;
}

export function parseFinalState(finalState: string): number[] {
  return finalState.split("").map((char) => Number(char));
}

function countInversions(board: number[]): number {
  let inversions = 0;
  const filteredBoard = board.filter((cell) => cell !== 0);
  for (let i = 0; i < filteredBoard.length; i++) {
    for (let j = i + 1; j < filteredBoard.length; j++) {
      if (filteredBoard[i] > filteredBoard[j]) {
        inversions++;
      }
    }
  }

  return inversions;
}

function isSolvable(initialBoard: number[], finalState: number[]) {
  return countInversions(initialBoard) % 2 === countInversions(finalState) % 2;
}

function arraysEqual(a: number[], b: number[]) {
  return a.every((v, i) => v === b[i]);
}

export function bestFirst(
  initialBoard: number[],
  finalStateString: string,
  heuristic: string,
  level: string
) {
  const startTime = performance.now();
  if (!isSolvable(initialBoard, parseFinalState(finalStateString))) {
    return { solvable: false };
  } else {
    const finalState = parseFinalState(finalStateString);
    const startHeuristic = getHeuristic(initialBoard, finalState, heuristic);
    const queue = new PriorityQueue<Node>();
    const visitedBoards = new Set<string>();
    const startNode: Node = {
      board: initialBoard,
      g: 0,
      h: startHeuristic,
      f: 0,
    };
    queue.enqueue(startNode, startHeuristic);
    let nodesExpanded = 0;
    while (!queue.isEmpty()) {
      const current = queue.dequeue()!;
      const currentBoardString = current.board.toString();
      if (!visitedBoards.has(currentBoardString)) {
        nodesExpanded++;
        visitedBoards.add(currentBoardString);
        if (arraysEqual(current.board, finalState)) {
          return {
            solvable: true,
            found: true,
            visitedNodes: nodesExpanded,
            time: performance.now() - startTime,
            solutionLength: current.g,
          };
        }

        const children = getChildren(current.board);
        for (const child of children) {
          const childString = child.toString();
          if (!visitedBoards.has(childString)) {
            const childHeuristic = getHeuristic(child, finalState, heuristic);
            let score = childHeuristic;
            if (level === "second") {
              let minGrand = childHeuristic;
              const grands = getChildren(child);
              for (const grand of grands) {
                const grandHeuristic = getHeuristic(
                  grand,
                  finalState,
                  heuristic
                );
                if (grandHeuristic < minGrand) {
                  minGrand = grandHeuristic;
                }
              }

              score = Math.min(childHeuristic, minGrand);
            }

            const childNode: Node = {
              board: child,
              g: current.g + 1,
              h: childHeuristic,
              f: 0,
            };

            queue.enqueue(childNode, score);
          }
        }
      }
    }

    return {
      solvable: true,
      found: false,
      visitedNodes: nodesExpanded,
      time: performance.now() - startTime,
    };
  }
}
