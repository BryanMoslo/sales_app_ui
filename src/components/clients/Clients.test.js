import { render, screen } from '@testing-library/react';
import ClientsList from "./List";


test('renders learn react link', () => {
  render(<ClientsList />);
  /*const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();*/
});
