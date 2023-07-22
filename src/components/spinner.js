import React from 'react';
import spinner from '../../assets/spinner.gif';
import styles from '../styles/spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.container}>
      <img src={spinner} width={100} />
    </div>
  );
};

export default Spinner;
