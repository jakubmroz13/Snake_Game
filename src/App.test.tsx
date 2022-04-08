import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('rendeers snake game board', () => {
  render(<App />);
  const linkElement = screen.getByText(/Snake/i);
  expect(linkElement).toBeInTheDocument();
});
