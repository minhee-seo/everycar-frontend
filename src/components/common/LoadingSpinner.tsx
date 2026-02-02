import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = "정보를 불러오는 중입니다..." }: LoadingSpinnerProps) => {
  return (
      <div className={styles.container}>
        <div className={styles.spinner}></div>
        {message && <p className={styles.message}>{message}</p>}
      </div>
  );
};

export default LoadingSpinner;