import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import Heading from './Heading';
import styles from './heading.module.css';

describe('Heading', () => {
  it('renders small heading as h3', () => {
    render(<Heading size="small" label="Small heading" />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Small heading');
  });

  it('renders medium heading as h2', () => {
    render(<Heading size="medium" label="Medium heading" />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Medium heading');
  });

  it('renders large heading as h1', () => {
    render(<Heading size="large" label="Large heading" />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Large heading');
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Heading size="medium" label="Test heading" />);

    const heading = container.firstChild as HTMLElement;
    expect(heading).toHaveClass(styles.heading, styles.medium);
  });
});
