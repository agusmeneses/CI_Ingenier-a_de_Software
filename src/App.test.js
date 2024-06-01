import { render, screen } from '@testing-library/react';
import App from './App';

test('elemento de input', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Ingrese un número del 1 al 100/i);
  expect(inputElement).toBeInTheDocument();
});
