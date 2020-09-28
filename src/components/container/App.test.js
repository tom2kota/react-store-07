import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Homepage', () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/Homepage/i);
  expect(textElement).toBeInTheDocument();
});
