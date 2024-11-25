import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import ButtonLoader from '../components/ButtonLoader';

describe('ButtonLoader', () => {
  it('renders loader with correct test id', () => {
    render(<ButtonLoader />);
    expect(screen.getByTestId('button-loader')).toBeInTheDocument();
  });

  it('renders four div elements for the loading animation', () => {
    render(<ButtonLoader />);
    const loader = screen.getByTestId('button-loader');
    expect(loader.children).toHaveLength(4);
  });
});
