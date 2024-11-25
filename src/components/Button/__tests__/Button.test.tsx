import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import Button from '../components/Button';

describe('Button', () => {
  it('renders button with label correctly', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders button with children correctly', () => {
    render(
      <Button onClick={() => {}}>
        <span>Child content</span>
      </Button>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loader when pending', () => {
    render(<Button label="Loading" onClick={() => {}} pending={true} />);
    expect(screen.getByTestId('button-loader')).toBeInTheDocument();
  });

  it('disables button when pending', () => {
    render(<Button label="Loading" onClick={() => {}} pending={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom width', () => {
    render(<Button label="Custom width" onClick={() => {}} width="200px" />);
    expect(screen.getByRole('button')).toHaveStyle({ width: '200px' });
  });

  it('applies default width of 100%', () => {
    render(<Button label="Default width" onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveStyle({ width: '100%' });
  });
});
