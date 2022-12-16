import { render, screen } from '@testing-library/react';
import OffersList from "./List";

test('renders learn react link', () => {
  render(<OffersList />);
  /*const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();*/
});
