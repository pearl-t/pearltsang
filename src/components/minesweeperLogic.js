export const SIZE = 9;
export const MINE_COUNT = 10;

export const DIFFICULTIES = {
  beginner: { label: 'Beginner', rows: 9, columns: 9, mines: 10 },
  intermediate: { label: 'Intermediate', rows: 16, columns: 16, mines: 40 },
  expert: { label: 'Expert', rows: 16, columns: 30, mines: 99 },
};

export function neighbors(index, config = DIFFICULTIES.beginner) {
  const { rows, columns } = config;
  const row = Math.floor(index / columns);
  const column = index % columns;
  const result = [];
  for (let y = row - 1; y <= row + 1; y += 1) {
    for (let x = column - 1; x <= column + 1; x += 1) {
      if (y >= 0 && y < rows && x >= 0 && x < columns && (y !== row || x !== column)) result.push(y * columns + x);
    }
  }
  return result;
}

export function emptyBoard(config = DIFFICULTIES.beginner) {
  return Array.from({ length: config.rows * config.columns }, () => ({ mine: false, revealed: false, flagged: false, count: 0 }));
}

export function placeMines(board, safeIndex, random = Math.random, config = DIFFICULTIES.beginner) {
  const protectedCells = new Set([safeIndex, ...neighbors(safeIndex, config)]);
  const candidates = board.map((_, index) => index).filter(index => !protectedCells.has(index));
  for (let i = candidates.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  const mines = new Set(candidates.slice(0, config.mines));
  return board.map((cell, index) => ({ ...cell, mine: mines.has(index), count: neighbors(index, config).filter(neighbor => mines.has(neighbor)).length }));
}

export function reveal(board, index, config = DIFFICULTIES.beginner) {
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
    if (cell.count === 0) pending.push(...neighbors(current, config));
  }
  return { board: next, status: next.every(cell => cell.mine || cell.revealed) ? 'won' : 'playing' };
}
