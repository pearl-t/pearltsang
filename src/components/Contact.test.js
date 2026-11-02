import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import emailjs from '@emailjs/browser';
import Contact from './Contact';

jest.mock('@emailjs/browser', () => ({ sendForm: jest.fn() }));

function fillNote() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test visitor' } });
  fireEvent.change(screen.getByLabelText('Note'), { target: { value: 'A test note' } });
}

beforeEach(() => jest.clearAllMocks());

test('failed sending preserves the note, shows an error, and allows retry', async () => {
  emailjs.sendForm.mockRejectedValueOnce(new Error('Service unavailable'));
  render(<Contact />);
  expect(screen.queryByRole('textbox', { name: 'Email' })).not.toBeInTheDocument();
  fillNote();
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('couldn’t be sent');
  expect(screen.getByLabelText('Note')).toHaveValue('A test note');
  expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
  expect(screen.queryByText(/Thanks for the note/)).not.toBeInTheDocument();
});

test('sending disables submission and only shows thanks after success', async () => {
  let resolveSend;
  emailjs.sendForm.mockImplementationOnce(() => new Promise(resolve => { resolveSend = resolve; }));
  render(<Contact />);
  fillNote();
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled();
  fireEvent.submit(screen.getByLabelText('Note').closest('form'));
  expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
  resolveSend({ status: 200 });
  await waitFor(() => expect(screen.getByText(/Thanks for the note/)).toBeInTheDocument());
});
