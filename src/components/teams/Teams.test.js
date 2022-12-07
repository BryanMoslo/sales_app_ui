import { render, screen } from '@testing-library/react';
import Teams from './Teams';

test('renders learn react link', () => {
  render(<Teams />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
