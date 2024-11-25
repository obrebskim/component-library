import { memo, useState } from 'react';

import styles from '../asideMenu.module.css';
import { useActiveMenuItem } from '../hooks/useActiveMenuItem';
import { MenuItem as MenuItemType } from '../types';

import ItemContent from './MenuItemContent';
import MenuSubitem from './MenuSubitem';

type Props = {
  goTo: (path: string) => void;
  item: MenuItemType;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};

const MenuItem = memo(({ goTo, item, isMenuOpen, setIsMenuOpen }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const isActive = useActiveMenuItem(item.link);

  const handleClick = () => {
    if (item.submenu && item.submenu.length > 0) {
      if (isMenuOpen) {
        setIsOpen(!isOpen);
      } else {
        setIsMenuOpen(true);
        setIsOpen(true);
      }
    } else {
      goTo(item.link);
    }
  };

  return (
    <li
      key={item.label}
      className={[styles.item, isOpen && isMenuOpen && styles.open].join(' ')}
      onClick={handleClick}
    >
      <ItemContent item={item} isOpen={isOpen} isActive={isActive} />
      {item.submenu && item.submenu.length > 0 && (
        <ul className={styles.submenu}>
          {item.submenu.map((subItem) => (
            <MenuSubitem goTo={goTo} key={subItem.label} item={subItem} />
          ))}
        </ul>
      )}
    </li>
  );
});

export default MenuItem;
