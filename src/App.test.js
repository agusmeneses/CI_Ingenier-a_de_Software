import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import App from './App';

test('valor ingresado no es cero ni menor a cero', () => {
  act(() => {
    render(<App />);
  });
  const inputElement = screen.getByPlaceholderText(/Ingrese un número del 1 al 100/i);
  fireEvent.change(inputElement, { target: { value: '0' } });
  fireEvent.click(screen.getByText(/Crear Ruleta/i));
  expect(window.alert).toHaveBeenCalledWith('Por favor, ingrese un número del 1 al 100');
});

test('valor ingresado no es 101 ni mayor', () => {
  act(() => {
    render(<App />);
  });
  const inputElement = screen.getByPlaceholderText(/Ingrese un número del 1 al 100/i);
  fireEvent.change(inputElement, { target: { value: '101' } });
  fireEvent.click(screen.getByText(/Crear Ruleta/i));
  expect(window.alert).toHaveBeenCalledWith('Por favor, ingrese un número del 1 al 100');
});

