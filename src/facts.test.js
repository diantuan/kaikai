import {render, screen} from '@testing-library/react'
import Facts from './components/facts/Facts'

test('renders the facts', async()=>{
  render(<Facts/>)
  const fact = await screen.findByText(/facts/i)
  expect(fact).toBeInTheDocument
})