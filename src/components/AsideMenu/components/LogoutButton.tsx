import styles from '../asideMenu.module.css';

import LogoutIcon from './LogoutIcon.icon';

type Props = {
  logout: () => Promise<void>;
};

const LogoutButton = ({ logout }: Props) => {
  return (
    <button onClick={logout} className={styles.logoutButton} title="Logout">
      <LogoutIcon /> <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
