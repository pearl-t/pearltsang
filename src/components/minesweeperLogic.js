export const SIZE = 9;
export const MINE_COUNT = 10;

export function neighbors(index) {
  const row = Math.floor(index / SIZE);
  const column = index % SIZE;
  const result = [];
  for (let y = row - 1; y <= row + 1; y += 1) {
    for (let x = column - 1; x <= column + 1; x += 1) {
      if (y >= 0 && y < SIZE && x >= 0 && x < SIZE && (y !== row || x !== column)) result.push(y * SIZE + x);
    }
  }
  return result;
}

export function emptyBoard() {
  return Array.from({ length: SIZE * SIZE }, () => ({ mine: false, revealed: false, flagged: false, count: 0 }));
}

export function placeMines(board, safeIndex, random = Math.random) {
  const protectedCells = new Set([safeIndex, ...neighbors(safeIndex)]);
  const candidates = board.map((_, index) => index).filter(index => !protectedCells.has(index));
  for (let i = candidates.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  const mines = new Set(candidates.slice(0, MINE_COUNT));
  return board.map((cell, index) => ({ ...cell, mine: mines.has(index), count: neighbors(index).filter(neighbor => mines.has(neighbor)).length }));
}

export function reveal(board, index) {
  if (board[index].flagged || board[index].revealed) return { board, status: 'playing' };
  const next = board.map(cell => ({ ...cell }));
  if (next[index].mine) {
    next[index].exploded = true;
    next.forEach(cell => { if (cell.mine) cell.revealed = true; });
    return { board: next, status: 'lost' };
  }
  const pending = [index];
  while (pending.length) {
    const current = pending.pop();
    const cell = next[current];
    if (cell.revealed || cell.flagged || cell.mine) continue;
    cell.revealed = true;
    if (cell.count === 0) pending.push(...neighbors(current));
  }
  return { board: next, status: next.every(cell => cell.mine || cell.revealed) ? 'won' : 'playing' };
}
