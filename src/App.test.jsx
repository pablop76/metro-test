import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

// Minimalna baza — App pobiera questions.json przy montowaniu
const QUESTIONS = {
  questions: [
    { id: 'q001', question: 'Pytanie pierwsze', content: ['a', 'b', 'c'], correct: 0, category: ['sop'] },
    { id: 'q002', question: 'Pytanie drugie', content: ['a', 'b', 'c'], correct: 1, category: ['sygnalizacja'] },
  ],
};

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(QUESTIONS) }))
  );
});

describe('App', () => {
  it('renderuje nagłówek', async () => {
    render(<App />);
    expect(screen.getByText(/Test okresowy dla maszynistów metra/i)).toBeInTheDocument();
    // Odczekanie na asynchroniczne wczytanie bazy, żeby stan nie zmieniał się po teście
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  it('wczytuje bazę pytań i pokazuje licznik przy kategorii', async () => {
    render(<App />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('questions.json'));
    });
    // "Pula pytań" dostaje licznik 2 — oba pytania sa poza kategoria 81
    await waitFor(() => {
      expect(screen.getByText('Pula pytań').textContent).toContain('2');
    });
  });
});
