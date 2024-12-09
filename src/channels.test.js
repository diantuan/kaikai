import { render, screen } from '@testing-library/react';
import App from './App';


test('renders channels', () => {
  render(<App />);
  const linkElement = screen.getByText(/channels/i);
  expect(linkElement).toBeInTheDocument();
});