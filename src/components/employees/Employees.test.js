import { render, screen } from '@testing-library/react';
import Employees from './List';

test('renders learn react link', () => {
  render(<Employees />);
 /* const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();*/
});
