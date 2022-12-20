import { render, screen } from '@testing-library/react';
import SalesList from "./List";


test('renders learn react link', () => {
  render(<SalesList />);
/*  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();*/
});
