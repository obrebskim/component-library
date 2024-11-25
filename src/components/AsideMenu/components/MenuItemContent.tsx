import { memo } from 'react';

import styles from '../asideMenu.module.css';
import { MenuItem } from '../types';

import ArrowIcon from './Arrow.icon';

type Props = {
  item: MenuItem;
  isOpen: boolean;
  isActive: boolean;
};

const ItemContent = memo(({ item, isOpen, isActive }: Props) => (
  <div className={[styles.itemContent, isActive && styles.active].join(' ')}>
    <button className={styles.buttonIcon} title={item.label}>
      {item.icon}
    </button>
    <span className={styles.itemLabel}>{item.label}</span>
    {item.submenu && item.submenu.length > 0 && (
      <div className={styles.itemControls}>
        <ArrowIcon rotate={isOpen ? 180 : 0} />
      </div>
    )}
  </div>
));

export default ItemContent;
