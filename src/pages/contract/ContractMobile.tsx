import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './ContractMobile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCreditCard, faMobileScreenButton, faCheckCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function ContractMobile() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (

    <>
      <div className={styles.container}>
        {/* 1. 자동차 정보 섹션 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>대여 정보</h3>
          <div className={styles.carInfoCard}>
            <div className={styles.carText}>
              <span className={styles.carBrand}>현대</span>
              <h4>아이오닉 5 (전기)</h4>
              <p className={styles.rentalPeriod}>12.26 14:00 ~ 12.27 14:00 (24시간)</p>
              <p className={styles.location}>강남역 에브리카 대여소</p>
            </div>
            <img src="/sample-car.png" alt="car" className={styles.carImg} />
          </div>
        </section>

        {/* 2. 개인 정보 섹션 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>운전자 정보</h3>
          <div className={styles.infoBox}>
            <div className={styles.infoRow}>
              <span>이름</span>
              <p>홍길동</p>
            </div>
            <div className={styles.infoRow}>
              <span>연락처</span>
              <p>010-1234-5678</p>
            </div>
          </div>
        </section>

        {/* 3. 결제 수단 섹션 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>결제 수단 선택</h3>
          <div className={styles.paymentMethods}>
            <button
              className={`${styles.methodBtn} ${paymentMethod === 'card' ? styles.active : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              <FontAwesomeIcon icon={faCreditCard} />
              <span>신용/체크카드</span>
            </button>
            <button
              className={`${styles.methodBtn} ${paymentMethod === 'kakao' ? styles.active : ''}`}
              onClick={() => setPaymentMethod('kakao')}
            >
              <FontAwesomeIcon icon={faMobileScreenButton} />
              <span>카카오페이</span>
            </button>
          </div>
        </section>

        {/* 4. 최종 결제 요약 */}
        <section className={`${styles.section} ${styles.summarySection}`}>
          <h3 className={styles.sectionTitle}>결제 금액</h3>
          <div className={styles.priceRow}>
            <span>대여 요금</span>
            <p>85,000원</p>
          </div>
          <div className={styles.priceRow}>
            <span>보험료 (라이트)</span>
            <p>12,400원</p>
          </div>
          <hr />
          <div className={`${styles.priceRow} ${styles.totalPrice}`}>
            <span>총 결제 금액</span>
            <p>97,400원</p>
          </div>
        </section>

      </div>
      {/* 하단 고정 버튼 */}
      <footer className={styles.footer}>
        <div className={styles.agreeText}>
          <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />
          예약 조건 및 개인정보 처리방침에 동의합니다.
        </div>
        <button className={styles.submitBtn}>
          97,400원 결제하기
        </button>
      </footer>
    </>
  );
}

export default ContractMobile
