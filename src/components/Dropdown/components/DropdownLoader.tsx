import styles from '../dropdown.module.css';

const DropdownLoader = () => {
  return (
    <div data-testid="dropdown-loader" className={styles['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DropdownLoader;
