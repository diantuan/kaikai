import { render, screen } from '@testing-library/react';
import NotFound from './components/notfound/NotFound';


test('renders does not exist', () => {
  render(<NotFound />);
  const linkElement = screen.getByText(/does not exist/i);
  expect(linkElement).toBeInTheDocument();
});