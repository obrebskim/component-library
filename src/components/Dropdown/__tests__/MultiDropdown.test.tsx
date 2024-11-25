import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import Dropdown from '../components/Dropdown';
import { MultiDropdown } from '../types';

const LABEL = 'Select options';

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('MultiDropdown', () => {
  const defaultProps: MultiDropdown = {
    label: LABEL,
    options: mockOptions,
    value: [],
    onChange: vi.fn(),
    multiple: true,
  };

  it('handles multiple selections', async () => {
    const onChange = vi.fn();
    render(<Dropdown {...defaultProps} onChange={onChange} />);

    await userEvent.click(screen.getByText(LABEL));
    await userEvent.click(screen.getByText('Option 1'));

    expect(onChange).toHaveBeenCalledWith([mockOptions[0]]);
  });

  it('allows removing selected options', async () => {
    const onChange = vi.fn();
    render(<Dropdown {...defaultProps} value={[mockOptions[0]]} onChange={onChange} />);

    const removeButton = screen.getByTestId('clear-selection');
    await userEvent.click(removeButton);

    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('keeps dropdown open after selection in multiple mode', async () => {
    render(<Dropdown {...defaultProps} />);

    await userEvent.click(screen.getByText(LABEL));
    await userEvent.click(screen.getByText('Option 1'));

    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
  });
});
