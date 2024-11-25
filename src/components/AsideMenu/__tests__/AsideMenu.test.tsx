import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import styles from '../asideMenu.module.css';
import AsideMenu from '../components/AsideMenu';
import { MenuItem } from '../types';

const mockItems: MenuItem[] = [
  {
    label: 'Home',
    link: '/',
    icon: <span>🏠</span>,
  },
  {
    label: 'Settings',
    link: '/settings',
    icon: <span>⚙️</span>,
    submenu: [
      { label: 'Profile', link: '/settings/profile' },
      { label: 'Security', link: '/settings/security' },
    ],
  },
];

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('AsideMenu', () => {
  it('renders menu items correctly', () => {
    renderWithRouter(<AsideMenu isOpen={true} items={mockItems} setIsOpen={vi.fn()} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders logo when provided', () => {
    const logoText = 'Logo';
    renderWithRouter(
      <AsideMenu isOpen={true} items={mockItems} logo={<div>{logoText}</div>} setIsOpen={vi.fn()} />
    );

    expect(screen.getByText(logoText)).toBeInTheDocument();
  });

  it('applies correct classes based on isOpen prop', () => {
    const { rerender } = renderWithRouter(
      <AsideMenu isOpen={false} items={mockItems} setIsOpen={vi.fn()} />
    );

    const menu = screen.getByRole('navigation');
    expect(menu).not.toHaveClass(styles.open);

    rerender(
      <BrowserRouter>
        <AsideMenu isOpen={true} items={mockItems} setIsOpen={vi.fn()} />
      </BrowserRouter>
    );

    expect(menu).toHaveClass(styles.open);
  });
});
