import { render, screen } from '@testing-library/react';
import App from './App';


test('renders kaikais', () => {
  render(<App />);
  const linkElement = screen.getByText(/kaikais/i);
  expect(linkElement).toBeInTheDocument();
});