import { emptyBoard, neighbors, placeMines, reveal, MINE_COUNT } from './minesweeperLogic';

test('first click and all its neighbors are mine-free, with exactly ten mines', () => {
  for (const index of [0, 8, 40, 72, 80]) {
    const board = placeMines(emptyBoard(), index, () => 0.25);
    expect(board.filter(cell => cell.mine)).toHaveLength(MINE_COUNT);
    expect([index, ...neighbors(index)].every(i => !board[i].mine)).toBe(true);
    expect(reveal(board, index).status).not.toBe('lost');
  }
});

test('edge cells do not count mines across the row boundary', () => {
  expect(neighbors(8)).not.toContain(9);
  expect(neighbors(0)).toEqual([1, 9, 10]);
});

test('flood fill stops at flags and numbered cells without changing the original board', () => {
  const board = emptyBoard();
  board[0].flagged = true;
  const result = reveal(board, 40);
  expect(result.board[0].revealed).toBe(false);
  expect(result.board.filter(cell => cell.revealed)).toHaveLength(80);
  expect(board.every(cell => !cell.revealed)).toBe(true);
});

test('revealing all non-mine cells wins without requiring flags', () => {
  const board = emptyBoard();
  board[0].mine = true;
  [1, 9, 10].forEach(i => { board[i].count = 1; });
  expect(reveal(board, 80).status).toBe('won');
});

test('a mine ends the game and reveals the other mines', () => {
  const board = emptyBoard();
  board[5].mine = true;
  board[15].mine = true;
  const result = reveal(board, 5);
  expect(result.status).toBe('lost');
  expect(result.board[5].exploded).toBe(true);
  expect(result.board[15].revealed).toBe(true);
});

test.each([
  { rows: 9, columns: 9, mines: 10 },
  { rows: 16, columns: 16, mines: 40 },
  { rows: 16, columns: 30, mines: 99 },
])('supports a $rows × $columns board with $mines mines', config => {
  const index = Math.floor(config.rows / 2) * config.columns + Math.floor(config.columns / 2);
  const board = placeMines(emptyBoard(config), index, () => 0.37, config);
  expect(board).toHaveLength(config.rows * config.columns);
  expect(board.filter(cell => cell.mine)).toHaveLength(config.mines);
  expect([index, ...neighbors(index, config)].every(i => !board[i].mine)).toBe(true);
  expect(neighbors(config.columns - 1, config)).not.toContain(config.columns);
  expect(reveal(board, index, config).status).not.toBe('lost');
  board.forEach((cell, i) => {
    expect(cell.count).toBe(neighbors(i, config).filter(n => board[n].mine).length);
  });
});
