import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import emailjs from '@emailjs/browser';
import Contact from './Contact';

jest.mock('@emailjs/browser', () => ({ sendForm: jest.fn() }));

function fillNote() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test visitor' } });
  fireEvent.change(screen.getByLabelText('Note'), { target: { value: 'A test note' } });
}

beforeEach(() => { jest.clearAllMocks(); jest.useFakeTimers(); });
afterEach(() => jest.useRealTimers());
function openMessenger() {
  render(<Contact />);
  act(() => jest.advanceTimersByTime(2000));
}

test('failed sending preserves the note, shows an error, and allows retry', async () => {
  emailjs.sendForm.mockRejectedValueOnce(new Error('Service unavailable'));
  openMessenger();
  expect(screen.queryByRole('textbox', { name: 'Email' })).not.toBeInTheDocument();
  fillNote();
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('couldn’t be sent');
  expect(screen.getByLabelText('Note')).toHaveValue('A test note');
  expect(screen.getByRole('button', { name: 'Send' })).toBeEnabled();
  expect(screen.queryByText(/Thanks for the note/)).not.toBeInTheDocument();
});

test('sending disables submission and only shows thanks after success', async () => {
  let resolveSend;
  emailjs.sendForm.mockImplementationOnce(() => new Promise(resolve => { resolveSend = resolve; }));
  openMessenger();
  fillNote();
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
  expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled();
  fireEvent.submit(screen.getByLabelText('Note').closest('form'));
  expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
  resolveSend({ status: 200 });
  await waitFor(() => expect(screen.getByDisplayValue(/Thanks for the note/)).toBeInTheDocument());
  expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  expect(screen.getByLabelText('Note')).toBeInTheDocument();
  fireEvent.submit(screen.getByLabelText('Note').closest('form'));
  expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
});

test('opens after two seconds and restores the cursor on close', () => {
  const { unmount } = render(<Contact />);
  expect(screen.getByRole('status')).toHaveTextContent('Opening your message window');
  expect(document.body).toHaveClass('aim-opening');
  act(() => jest.advanceTimersByTime(1999));
  expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  act(() => jest.advanceTimersByTime(1));
  expect(screen.getByLabelText('Name')).toBeInTheDocument();
  expect(document.body).not.toHaveClass('aim-opening');
  unmount();
  const next = render(<Contact />);
  next.unmount();
  expect(document.body).not.toHaveClass('aim-opening');
});

test('restores a delivered conversation with confirmation in the typing box and Send disabled', () => {
  const message = { name: 'Visitor', message: 'Hello Pearl' };
  render(<Contact deliveredMessage={message} />);
  expect(screen.getByText('Hello Pearl', { exact: false })).toBeInTheDocument();
  expect(screen.getByLabelText('Note')).toHaveValue('Thanks for the note! Your message has been sent to pearl.');
  expect(screen.getByLabelText('Note')).toHaveAttribute('readonly');
  expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  fireEvent.submit(screen.getByLabelText('Note').closest('form'));
  expect(emailjs.sendForm).not.toHaveBeenCalled();
});
