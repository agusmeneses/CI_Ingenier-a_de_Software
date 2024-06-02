import { render, screen } from '@testing-library/react';
import { act } from 'react';
import App from './App';

test('elemento de input', () => {
  act(() => {
    render(<App />);
  });
  const inputElement = screen.getByPlaceholderText(/Ingrese un número del 1 al 100/i);
  expect(inputElement).toBeInTheDocument();
});

