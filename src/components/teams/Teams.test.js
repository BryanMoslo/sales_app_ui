import { render, screen } from '@testing-library/react';
import Teams from './List';

test('renders learn react link', () => {
  render(<Teams />);
/*  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();*/
});
