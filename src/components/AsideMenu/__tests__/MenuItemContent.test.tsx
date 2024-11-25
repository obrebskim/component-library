import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import styles from '../asideMenu.module.css';
import MenuItemContent from '../components/MenuItemContent';
import { MenuItem } from '../types';

const mockItem: MenuItem = {
  label: 'Settings',
  link: '/settings',
  icon: <span>⚙️</span>,
  submenu: [
    { label: 'Profile', link: '/settings/profile' },
    { label: 'Security', link: '/settings/security' },
  ],
};

describe('MenuItemContent', () => {
  it('renders item content correctly', () => {
    render(<MenuItemContent item={mockItem} isOpen={false} isActive={false} />);

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByTitle('Settings')).toBeInTheDocument();
  });

  it('shows arrow icon when item has submenu', () => {
    render(<MenuItemContent item={mockItem} isOpen={false} isActive={false} />);

    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
  });

  it('applies active class when isActive is true', () => {
    render(<MenuItemContent item={mockItem} isOpen={false} isActive={true} />);

    const content = screen.getByText('Settings').closest(`.${styles.itemContent}`);
    expect(content).toHaveClass(styles.active);
  });

  it('rotates arrow when menu is open', () => {
    render(<MenuItemContent item={mockItem} isOpen={true} isActive={false} />);

    const arrow = screen.getByTestId('arrow-icon');
    expect(arrow).toHaveStyle('transform: rotate(180deg)');
  });
});
