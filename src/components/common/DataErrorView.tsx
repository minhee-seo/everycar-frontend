import React from 'react';
import styles from './ErrorView.module.scss';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
  title?: string;
}

const ErrorView = ({ 
  message = "데이터를 불러오는 중 문제가 발생했습니다.", 
  onRetry,
  title = "오류가 발생했습니다"
}: ErrorViewProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          다시 시도하기
        </button>
      )}
    </div>
  );
};

export default ErrorView;