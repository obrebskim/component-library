import styles from './heading.module.css';

type Props = {
  size: 'small' | 'medium' | 'large';
  label: string;
};
const Heading = ({ size, label }: Props) => {
  const className = `${styles.heading} ${styles[size]}`;

  if (size === 'small') {
    return <h3 className={className}>{label}</h3>;
  }

  if (size === 'medium') {
    return <h2 className={className}>{label}</h2>;
  }

  return <h1 className={className}>{label}</h1>;
};

export default Heading;
