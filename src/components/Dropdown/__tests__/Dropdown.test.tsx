import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Dropdown } from '../components';
import { DropdownProps } from '../types';

const LABEL = 'Select option';

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('Dropdown', () => {
  const defaultProps: DropdownProps = {
    label: LABEL,
    options: mockOptions,
    value: null,
    onChange: vi.fn(),
    multiple: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with label', () => {
    render(<Dropdown {...defaultProps} />);
    expect(screen.getByText(LABEL)).toBeInTheDocument();
  });

  it('opens options when clicked', async () => {
    render(<Dropdown {...defaultProps} />);
    const trigger = screen.getByText(LABEL);

    await userEvent.click(trigger);

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('handles single selection', async () => {
    const onChange = vi.fn();
    render(<Dropdown {...defaultProps} onChange={onChange} />);

    await userEvent.click(screen.getByText(LABEL));
    await userEvent.click(screen.getByText('Option 1'));

    expect(onChange).toHaveBeenCalledWith(mockOptions[0]);
  });

  it('handles multiple selection', async () => {
    const onChange = vi.fn();
    render(<Dropdown {...defaultProps} multiple value={[]} onChange={onChange} />);

    await userEvent.click(screen.getByText(LABEL));
    await userEvent.click(screen.getByText('Option 1'));

    expect(onChange).toHaveBeenCalledWith([mockOptions[0]]);
  });

  it('shows search input when searchable is true', async () => {
    render(<Dropdown {...defaultProps} searchable />);

    await userEvent.click(screen.getByText(LABEL));

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('filters options based on search input', async () => {
    render(<Dropdown {...defaultProps} searchable />);

    await userEvent.click(screen.getByText(LABEL));
    const searchInput = screen.getByPlaceholderText('Search...');

    await act(async () => {
      await userEvent.type(searchInput, 'Option 1');
      // Czekamy na debounce
      await new Promise((resolve) => setTimeout(resolve, 600));
    });

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('shows error state', () => {
    render(<Dropdown {...defaultProps} error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('closes when clicking outside', async () => {
    render(
      <div>
        <Dropdown {...defaultProps} />
        <div data-testid="outside">Outside</div>
      </div>
    );

    await act(async () => {
      await userEvent.click(screen.getByText(LABEL));
    });
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(screen.getByTestId('outside'));
    });
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('allows removing selected options in multiple mode', async () => {
    const onChange = vi.fn();
    const selectedOptions = [mockOptions[0], mockOptions[1]];

    render(<Dropdown {...defaultProps} multiple value={selectedOptions} onChange={onChange} />);

    const removeButtons = screen.getAllByTestId('remove-button');
    await userEvent.click(removeButtons[0]);

    expect(onChange).toHaveBeenCalledWith([mockOptions[1]]);
  });

  it('clears all selected values when clear button is clicked', async () => {
    const onChange = vi.fn();
    render(<Dropdown {...defaultProps} value={mockOptions[0]} onChange={onChange} />);

    const clearButton = screen.getByRole('button', { name: /clear/i });
    await userEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('handles async search correctly', async () => {
    const asyncSearch = vi.fn().mockResolvedValue(['Async Option 1']);
    render(<Dropdown {...defaultProps} searchable asyncSearch={asyncSearch} />);

    await userEvent.click(screen.getByText(LABEL));
    const searchInput = screen.getByPlaceholderText('Search...');

    await act(async () => {
      await userEvent.type(searchInput, 'test');
      // Czekamy na debounce
      await new Promise((resolve) => setTimeout(resolve, 600));
    });

    expect(asyncSearch).toHaveBeenCalledWith('test');
  });
});
