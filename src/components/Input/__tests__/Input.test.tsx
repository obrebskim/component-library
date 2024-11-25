import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import Input from '../Input';

describe('Input Component', () => {
  it('renders text input with label', () => {
    render(<Input label="Username" value="" onChange={() => {}} />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('handles text input changes', async () => {
    const handleChange = vi.fn();
    render(<Input label="Username" value="" onChange={handleChange} />);

    const input = screen.getByLabelText('Username');
    await userEvent.type(input, 'test');

    expect(handleChange).toHaveBeenNthCalledWith(1, 't');
    expect(handleChange).toHaveBeenNthCalledWith(2, 'e');
    expect(handleChange).toHaveBeenNthCalledWith(3, 's');
    expect(handleChange).toHaveBeenNthCalledWith(4, 't');
  });

  it('shows error message when error prop is provided', () => {
    render(<Input label="Username" value="" onChange={() => {}} error="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('handles number input correctly', async () => {
    const handleChange = vi.fn();
    render(<Input type="number" label="Age" value={undefined} onChange={handleChange} />);

    const input = screen.getByLabelText('Age');
    await userEvent.type(input, '25');

    expect(handleChange).toHaveBeenNthCalledWith(1, 2);
    expect(handleChange).toHaveBeenNthCalledWith(2, 5);
  });

  it('toggles password visibility', async () => {
    render(<Input type="password" label="Password" value="secret" onChange={() => {}} />);

    const input = screen.getByLabelText('Password') as HTMLInputElement;
    expect(input.type).toBe('password');

    const toggleButton = screen.getByRole('button', { name: /show password/i });
    await userEvent.click(toggleButton);

    expect(input.type).toBe('text');
  });

  it('clears input value when clear button is clicked', async () => {
    const handleChange = vi.fn();
    render(<Input label="Username" value="test" onChange={handleChange} />);

    const clearButton = screen.getByRole('button', { name: /clear/i });
    await userEvent.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('applies disabled state correctly', () => {
    render(<Input label="Username" value="" onChange={() => {}} disabled={true} />);

    expect(screen.getByLabelText('Username')).toBeDisabled();
  });
});
