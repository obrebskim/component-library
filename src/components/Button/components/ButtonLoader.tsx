import styles from '../button.module.css';

const ButtonLoader = () => {
  return (
    <div data-testid="button-loader" className={styles['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default ButtonLoader;
