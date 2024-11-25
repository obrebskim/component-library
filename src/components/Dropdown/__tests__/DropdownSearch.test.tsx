import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { DropdownSearch } from '../components/DropdownSearch';

describe('DropdownSearch', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
  };

  it('renders search input', () => {
    render(<DropdownSearch {...defaultProps} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('handles input change', async () => {
    const onChange = vi.fn();
    render(<DropdownSearch {...defaultProps} onChange={onChange} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'test');

    expect(onChange).toHaveBeenNthCalledWith(1, 't');
    expect(onChange).toHaveBeenNthCalledWith(2, 'e');
    expect(onChange).toHaveBeenNthCalledWith(3, 's');
    expect(onChange).toHaveBeenNthCalledWith(4, 't');
  });

  it('shows clear button when has value', () => {
    render(<DropdownSearch {...defaultProps} value="test" />);
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('clears search on clear button click', async () => {
    const onChange = vi.fn();
    render(<DropdownSearch {...defaultProps} value="test" onChange={onChange} />);

    await userEvent.click(screen.getByLabelText('Clear search'));
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('shows loader when disabled', () => {
    render(<DropdownSearch {...defaultProps} disabled />);
    expect(screen.getByTestId('dropdown-loader')).toBeInTheDocument();
  });
});
