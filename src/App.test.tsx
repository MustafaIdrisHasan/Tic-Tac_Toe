import React, { act } from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';

test('renders navigation and landing page content', async () => {
  await act(async () => {
    render(<App />);
  });

  // Header navigation should be present immediately
  const navigation = screen.getByRole('navigation', { name: /main navigation/i });
  expect(navigation).toBeInTheDocument();
  const navLinks = within(navigation).getAllByRole('link');
  expect(navLinks.map(link => link.textContent)).toEqual(
    expect.arrayContaining(['Home', 'Modes', 'Stats', 'Settings'])
  );

  // Landing page content loads after lazy loading completes
  const subtitle = await screen.findByText(/choose your challenge/i);
  expect(subtitle).toBeInTheDocument();
});
