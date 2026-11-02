import { fireEvent, render, screen } from '@testing-library/react';
import Photos from './Photos';

test('arrow keys navigate immediately and wrap around the gallery', () => {
  render(<Photos />);
  fireEvent.keyDown(document.body, { key: 'ArrowRight' });
  expect(screen.getByText('Photo 2 of 4')).toBeInTheDocument();
  fireEvent.keyDown(document.body, { key: 'ArrowLeft' });
  expect(screen.getByText('Photo 1 of 4')).toBeInTheDocument();
  fireEvent.keyDown(document.body, { key: 'ArrowLeft' });
  expect(screen.getByText('Photo 4 of 4')).toBeInTheDocument();
  fireEvent.keyDown(document.body, { key: 'ArrowRight' });
  expect(screen.getByText('Photo 1 of 4')).toBeInTheDocument();
});

test('keyboard navigation pauses when inactive and cleans up when closed', () => {
  const { rerender, unmount } = render(<Photos />);
  rerender(<Photos keyboardActive={false} />);
  fireEvent.keyDown(document.body, { key: 'ArrowRight' });
  expect(screen.getByText('Photo 1 of 4')).toBeInTheDocument();
  rerender(<Photos />);
  fireEvent.keyDown(document.body, { key: 'ArrowRight' });
  expect(screen.getByText('Photo 2 of 4')).toBeInTheDocument();
  unmount();
  fireEvent.keyDown(document.body, { key: 'ArrowRight' });
});
