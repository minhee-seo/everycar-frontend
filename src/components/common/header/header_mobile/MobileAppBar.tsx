import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';

import styles from './MobileAppBar.module.scss';

interface Props {
  title?: string;
  leftIcon?: any;
  rightIcon?: any;
  customClass?: string;
}

export default function MobileAppBar({ title, leftIcon, rightIcon, customClass }: Props) {
  const navigate = useNavigate();

  return (
    <header className={`${styles.mobileAppBar} ${customClass ? styles[customClass] : ''}`}>
      <button onClick={() => navigate(-1)}>
        {leftIcon && <FontAwesomeIcon icon={leftIcon} />}
      </button>
      <h1>{title}</h1>
      <button>
        {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
      </button>
    </header>
  );
}