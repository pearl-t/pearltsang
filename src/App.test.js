import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('profile opens the desktop and Minesweeper survives minimization', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: "Enter Pearl's world" }));
  fireEvent.click(within(screen.getByRole('navigation', { name: 'Desktop folders' })).getByRole('button', { name: 'Minesweeper' }));
  const board = screen.getByRole('group', { name: /Minesweeper board/ });
  expect(within(board).getAllByRole('button')).toHaveLength(81);
  const firstCell = within(board).getAllByRole('button')[0];
  fireEvent.contextMenu(firstCell);
  expect(firstCell).toHaveAccessibleName(/flagged/);
  expect(screen.getByLabelText('Mines remaining')).toHaveTextContent('009');
  fireEvent.click(screen.getByRole('button', { name: 'Minimize window' }));
  expect(board).not.toBeVisible();
  fireEvent.click(screen.getAllByRole('button', { name: 'Minesweeper' })[1]);
  expect(board).toBeVisible();
  expect(firstCell).toHaveAccessibleName(/flagged/);
  fireEvent.click(screen.getByRole('button', { name: 'Start a new Minesweeper game' }));
  expect(screen.getByLabelText('Mines remaining')).toHaveTextContent('010');
  fireEvent.click(within(board).getAllByRole('button')[40]);
  expect(screen.getByText('Good luck!')).toBeInTheDocument();
});


test('auto-enters after ten seconds but stays on login after logging off', () => {
  jest.useFakeTimers();
  try {
    render(<App />);
    act(() => jest.advanceTimersByTime(9999));
    expect(screen.getByRole('button', { name: "Enter Pearl's world" })).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(1));
    expect(screen.getByRole('heading', { name: "Hello World, I'm Pearl" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'start' }));
    fireEvent.click(screen.getByRole('button', { name: /Log Off/ }));
    act(() => jest.advanceTimersByTime(60000));
    expect(screen.getByRole('button', { name: "Enter Pearl's world" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: "Enter Pearl's world" }));
    expect(screen.getByRole('heading', { name: "Hello World, I'm Pearl" })).toBeInTheDocument();
  } finally {
    jest.useRealTimers();
  }
});
