import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('renders without crashing', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Checkbox label="Test Label" />);
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  it('applies padding style', () => {
    render(<Checkbox padding="10px" />);
    const label = screen.getByRole('checkbox').closest('label');
    expect(label).toHaveStyle({ paddingInline: '10px' });
  });

  it('reflects the checked state based on value prop', () => {
    const { rerender } = render(<Checkbox value={false} />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    rerender(<Checkbox value={true} />);
    expect(checkbox).toBeChecked();
  });
});
