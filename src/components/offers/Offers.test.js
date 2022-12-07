import { render, screen } from '@testing-library/react';
import Offers from './Offers';

test('renders learn react link', () => {
  render(<Offers />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
