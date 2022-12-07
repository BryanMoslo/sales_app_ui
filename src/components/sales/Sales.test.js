import { render, screen } from '@testing-library/react';
import Sales from './Sales';

test('renders learn react link', () => {
  render(<Sales />);
/*  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();*/
});
