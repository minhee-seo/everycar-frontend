import React from 'react';
import styles from './SearchTrigger.module.scss';

interface SearchTriggerProps {
  onClick: () => void;
}

const SearchTrigger: React.FC<SearchTriggerProps> = ({ onClick }) => {
  return (
    <button className={styles.trigger} onClick={onClick}>
      <span className={styles.text}>어디로 떠나시나요?</span>
      {/* 아이콘을 추가할 수 있습니다 */}
    </button>
  );
};

export default SearchTrigger;
