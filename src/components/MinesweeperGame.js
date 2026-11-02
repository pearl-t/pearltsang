import { useEffect, useState } from 'react';
import { emptyBoard, placeMines, reveal, DIFFICULTIES } from './minesweeperLogic';
import './Minesweeper.css';

const counter = value => String(Math.min(999, Math.max(-99, value))).padStart(3, '0');

export default function Minesweeper({ difficulty = 'beginner', onDifficultyChange }) {
  const config = DIFFICULTIES[difficulty];
  const [game, setGame] = useState(() => ({ board: emptyBoard(config), status: 'ready' }));
  const [seconds, setSeconds] = useState(0);
  const [flagMode, setFlagMode] = useState(false);
  const finished = game.status === 'won' || game.status === 'lost';
  const flags = game.board.filter(cell => cell.flagged).length;

  useEffect(() => {
    if (game.status !== 'playing') return;
    const timer = setInterval(() => setSeconds(value => Math.min(999, value + 1)), 1000);
    return () => clearInterval(timer);
  }, [game.status]);

  function reset(nextDifficulty = difficulty) {
    const config = DIFFICULTIES[nextDifficulty];
    setGame({ board: emptyBoard(config), status: 'ready' });
    setSeconds(0);
    setFlagMode(false);
  }

  function toggleFlag(index) {
    setGame(current => {
      if (['won', 'lost'].includes(current.status) || current.board[index].revealed) return current;
      return { ...current, board: current.board.map((cell, i) => i === index ? { ...cell, flagged: !cell.flagged } : cell) };
    });
  }

  function uncover(index) {
    setGame(current => {
      if (['won', 'lost'].includes(current.status) || current.board[index].flagged || current.board[index].revealed) return current;
      const board = current.status === 'ready' ? placeMines(current.board, index, Math.random, config) : current.board;
      return reveal(board, index, config);
    });
  }

  return (
    <div className="minesweeper" style={{ width: Math.max(310, config.columns * 28 + 6) }}>
      <div className="mine-game-menu"><button onClick={() => reset()}>New game</button><label>Difficulty <select value={difficulty} onChange={event => { onDifficultyChange(event.target.value); reset(event.target.value); }}>{Object.entries(DIFFICULTIES).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></label></div>
      <div className="mine-panel">
        <output className="mine-counter" aria-label="Mines remaining">{counter(config.mines - flags)}</output>
        <button className="mine-reset" onClick={() => reset()} aria-label="Start a new Minesweeper game">{game.status === 'lost' ? '😵' : game.status === 'won' ? '😎' : '🙂'}</button>
        <output className="mine-counter" aria-label="Elapsed seconds">{counter(seconds)}</output>
      </div>
      <div className="mine-board" role="group" aria-label={`Minesweeper board, ${config.rows} rows and ${config.columns} columns`} style={{ gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))` }}>
        {game.board.map((cell, index) => {
          const wrongFlag = game.status === 'lost' && cell.flagged && !cell.mine;
          const description = wrongFlag ? 'incorrect flag' : cell.flagged ? 'flagged' : cell.revealed ? cell.mine ? 'mine' : cell.count ? `${cell.count} nearby mines` : 'empty' : 'covered';
          return (
            <button
              key={index}
              className={`mine-cell ${cell.revealed ? 'revealed' : ''} ${cell.exploded ? 'exploded' : ''} ${wrongFlag ? 'wrong-flag' : ''}`}
              data-count={cell.count}
              aria-label={`Row ${Math.floor(index / config.columns) + 1}, column ${index % config.columns + 1}: ${description}`}
              aria-disabled={finished || cell.revealed}
              onClick={event => flagMode || event.shiftKey ? toggleFlag(index) : uncover(index)}
              onContextMenu={event => { event.preventDefault(); toggleFlag(index); }}
              onKeyDown={event => { if (event.key.toLowerCase() === 'f') { event.preventDefault(); toggleFlag(index); } }}
            >
              {wrongFlag ? '✕' : cell.flagged && !cell.revealed ? '⚑' : cell.revealed ? cell.mine ? '✹' : cell.count || '' : ''}
            </button>
          );
        })}
      </div>
      <div className="mine-tools"><button aria-pressed={flagMode} onClick={() => setFlagMode(!flagMode)}>⚑ Flag mode {flagMode ? 'on' : 'off'}</button></div>
      <p className="mine-help">Click to reveal. Right-click or Shift-click to flag.</p>
      <p className="mine-message" role="status">{game.status === 'won' ? 'You cleared the board! 😎' : game.status === 'lost' ? 'Oh no! Click the smiley to try again.' : game.status === 'ready' ? 'Your first click is always safe.' : 'Good luck!'}</p>
    </div>
  );
}
