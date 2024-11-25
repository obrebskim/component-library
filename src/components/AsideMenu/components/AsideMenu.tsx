import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../asideMenu.module.css';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { MenuItem as MenuItemType } from '../types';

import LogoutButton from './LogoutButton';
import MenuItem from './MenuItem';
type Props = {
  isOpen: boolean;
  items: MenuItemType[];
  logo?: React.ReactNode;
  setIsOpen: (isOpen: boolean) => void;
};

const AsideMenu = ({ isOpen, items, logo, setIsOpen }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useOutsideClick(menuRef, () => setIsOpen(false));

  const goTo = useCallback(
    (path: string) => {
      navigate(path);
    },

    [navigate]
  );

  return (
    <div className={[styles.menu, isOpen && styles.open].join(' ')} role="navigation" ref={menuRef}>
      {logo && <div className={styles.logo}>{logo}</div>}
      <ul className={styles.menuContainer}>
        {items.map((item) => (
          <MenuItem
            goTo={goTo}
            setIsMenuOpen={setIsOpen}
            key={item.label}
            item={item}
            isMenuOpen={isOpen}
          />
        ))}
      </ul>
      <LogoutButton logout={() => Promise.resolve()} />
    </div>
  );
};

export default AsideMenu;
