// src/pages/Signup/SignupProgress.tsx
import { useState } from "react";
import styles from "./SignupProgress.module.scss";



export default function SignupProgress() {

  const [step, setStep] = useState(1);
  
  return (
    <div className={styles.progressCont}>
      <ul className={styles.progressList}>
        <li className={`${styles.step} ${step >= 1 ? styles.active : ""}`}>
          <div className={styles.circle}>1</div>
          <span className={styles.label}>약관동의</span>
        </li>
        <li className={`${styles.step} ${step >= 2 ? styles.active : ""}`}>
          <div className={styles.circle}>2</div>
          <span className={styles.label}>정보입력</span>
        </li>
        <li className={`${styles.step} ${step >= 3 ? styles.active : ""}`}>
          <div className={styles.circle}>3</div>
          <span className={styles.label}>완료</span>
        </li>
      </ul>
      <div className={styles.line}>
        <div
          className={styles.fill}
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
      </div>
    </div>
  );
}
