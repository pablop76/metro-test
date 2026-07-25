// Rozszerza expect Vitesta o matchery DOM (toBeInTheDocument, toHaveTextContent itp.)
// https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Odmontowanie komponentów i wyczyszczenie localStorage między testami
afterEach(() => {
  cleanup();
  localStorage.clear();
});
