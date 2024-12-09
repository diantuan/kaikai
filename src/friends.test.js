import { render, screen } from '@testing-library/react';
import App from './App';

test('renders friends', () => {
  render(<App />);
  const linkElement = screen.getByText(/friends/i);
  expect(linkElement).toBeInTheDocument();
});