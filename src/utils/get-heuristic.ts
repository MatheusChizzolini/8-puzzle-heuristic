function misplaced(board: number[], finalState: number[]) {
  let count = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i] !== 0 && board[i] !== finalState[i]) {
      count++;
    }
  }

  return count;
}

function manhattan(board: number[], finalState: number[]) {
  let distance = 0;
  const size = 3;
  for (let i = 0; i < board.length; i++) {
    const value = board[i];
    if (value !== 0) {
      const goalIndex = finalState.indexOf(value);
      const currentRow = Math.floor(i / size);
      const currentCol = i % size;
      const goalRow = Math.floor(goalIndex / size);
      const goalCol = goalIndex % size;
      distance +=
        Math.abs(currentRow - goalRow) + Math.abs(currentCol - goalCol);
    }
  }

  return distance;
}

export function getHeuristic(
  board: number[],
  finalState: number[],
  selected: string
) {
  return selected === "misplaced"
    ? misplaced(board, finalState)
    : manhattan(board, finalState);
}
