import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { DropdownTrigger } from '../components/DropdownTrigger';

describe('DropdownTrigger', () => {
  const defaultProps = {
    label: 'Select option',
    value: null,
    isOpen: false,
    onRemove: vi.fn(),
    onClear: vi.fn(),
    onClick: vi.fn(),
  };

  it('renders label', () => {
    render(<DropdownTrigger {...defaultProps} />);
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  it('shows selected value in single mode', () => {
    render(<DropdownTrigger {...defaultProps} value={{ value: '1', label: 'Option 1' }} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('shows multiple values in multiple mode', () => {
    render(
      <DropdownTrigger
        {...defaultProps}
        multiple
        value={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('handles remove in multiple mode', async () => {
    const onRemove = vi.fn();
    render(
      <DropdownTrigger
        {...defaultProps}
        multiple
        value={[{ value: '1', label: 'Option 1' }]}
        onRemove={onRemove}
      />
    );

    const removeButton = screen.getByTestId('remove-button');
    await userEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalled();
  });

  it('shows error message', () => {
    render(<DropdownTrigger {...defaultProps} error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});
