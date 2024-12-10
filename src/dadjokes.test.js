import { screen, render } from '@testing-library/react';
import DadJokes from './components/dadjokes/DadJokes';


test('fetches response from the dad joke api', async () => {

  render(<DadJokes />);

  const joke = await screen.findByText(/cringe/i);

  expect(joke).toBeInTheDocument();
});
