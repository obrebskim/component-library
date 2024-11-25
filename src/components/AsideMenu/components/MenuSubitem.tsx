import styles from '../asideMenu.module.css';
import { useActiveMenuItem } from '../hooks/useActiveMenuItem';
import { SubmenuItem } from '../types';

type Props = {
  goTo: (path: string) => void;
  item: SubmenuItem;
};

const MenuSubitem = ({ goTo, item }: Props) => {
  const isActive = useActiveMenuItem(item.link);

  return (
    <li
      key={item.label}
      className={[styles.submenuItem, isActive && styles.active].join(' ')}
      onClick={(e) => {
        e.stopPropagation();
        goTo(item.link);
      }}
    >
      <span>{item.label}</span>
    </li>
  );
};

export default MenuSubitem;
