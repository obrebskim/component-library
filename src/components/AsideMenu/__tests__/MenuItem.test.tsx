import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import styles from '../asideMenu.module.css';
import MenuItem from '../components/MenuItem';
import { MenuItem as MenuItemType } from '../types';

const mockItem: MenuItemType = {
  label: 'Settings',
  link: '/settings',
  icon: <span>⚙️</span>,
  submenu: [
    { label: 'Profile', link: '/settings/profile' },
    { label: 'Security', link: '/settings/security' },
  ],
};

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('MenuItem', () => {
  it('renders item with submenu', () => {
    renderWithRouter(
      <MenuItem goTo={vi.fn()} item={mockItem} isMenuOpen={true} setIsMenuOpen={vi.fn()} />
    );

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });

  it('handles click on menu item without submenu', async () => {
    const goTo = vi.fn();
    const itemWithoutSubmenu = { ...mockItem, submenu: undefined };

    renderWithRouter(
      <MenuItem goTo={goTo} item={itemWithoutSubmenu} isMenuOpen={true} setIsMenuOpen={vi.fn()} />
    );

    await userEvent.click(screen.getByText('Settings'));
    expect(goTo).toHaveBeenCalledWith('/settings');
  });

  it('toggles submenu on click when menu is open', async () => {
    renderWithRouter(
      <MenuItem goTo={vi.fn()} item={mockItem} isMenuOpen={true} setIsMenuOpen={vi.fn()} />
    );

    const menuItem = screen.getByText('Settings').closest('li');
    expect(menuItem).not.toHaveClass('open');

    await userEvent.click(menuItem!);
    expect(menuItem).toHaveClass(styles.open);
  });
});
