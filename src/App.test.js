import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('table columns should be in document', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  render(<App />);
  const tableElementLogin = screen.getByText(/login/i);
  const tableElementAvatar = screen.getByText(/avatar_url/i);
  expect(tableElementLogin).toBeInTheDocument();
  expect(tableElementAvatar).toBeInTheDocument();
});

test('input works correctly', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  const app = render(<App />);
 
  const input = app.getByPlaceholderText('input search text')
  
  fireEvent.change(input, { target: { value: 'test' } })
 
  expect(input.value).toBe('test')
});