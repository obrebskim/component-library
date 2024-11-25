import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import styles from '../asideMenu.module.css';
import MenuSubitem from '../components/MenuSubitem';
import { SubmenuItem } from '../types';

const mockSubItem: SubmenuItem = {
  label: 'Profile',
  link: '/settings/profile',
};

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('MenuSubitem', () => {
  it('renders subitem correctly', () => {
    renderWithRouter(<MenuSubitem goTo={vi.fn()} item={mockSubItem} />);

    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('calls goTo with correct path on click', async () => {
    const goTo = vi.fn();
    const user = userEvent.setup();

    renderWithRouter(<MenuSubitem goTo={goTo} item={mockSubItem} />);

    await user.click(screen.getByText('Profile'));
    expect(goTo).toHaveBeenCalledWith('/settings/profile');
  });

  it('applies active class when route matches', () => {
    window.history.pushState({}, '', '/settings/profile');

    renderWithRouter(<MenuSubitem goTo={vi.fn()} item={mockSubItem} />);

    const subItem = screen.getByText('Profile').closest('li');
    expect(subItem).toHaveClass(styles.active);
  });
});
