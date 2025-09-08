import React from 'react';
import styles from './Payment.module.scss';

const Payment = () => {
  // Placeholder data
  const reservationDetails = {
    carModel: '현대 아이오닉 5',
    carImage: 'https://via.placeholder.com/300x200', // Placeholder image
    startDate: '2025.10.01 (수) 10:00',
    endDate: '2025.10.03 (금) 10:00',
    duration: '48시간',
    location: '서울역 주차장',
  };

  const priceDetails = {
    rental: 200000,
    insurance: 30000,
    total: 230000,
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
  };

  return (
    <div className={styles.container}>
      <div className={styles.paymentLayout}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          <h1 className={styles.pageTitle}>결제하기</h1>

          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>예약자 정보</h2>
            <div className={styles.formGrid}>
              <div className={styles.formField}>
                <label htmlFor="name">이름</label>
                <input type="text" id="name" defaultValue="홍길동" />
              </div>
              <div className={styles.formField}>
                <label>휴대폰 번호</label>
                <div className={styles.phoneInputGroup}>
                  <input type="text" maxLength="3" aria-label="휴대폰 번호 첫 세 자리" defaultValue="010" />
                  <span>-</span>
                  <input type="text" maxLength="4" aria-label="휴대폰 번호 중간 네 자리" defaultValue="1234" />
                  <span>-</span>
                  <input type="text" maxLength="4" aria-label="휴대폰 번호 마지막 네 자리" defaultValue="5678" />
                </div>
              </div>
              <div className={styles.formField}>
                <label htmlFor="license">운전면허 번호</label>
                <input type="text" id="license" placeholder="12-34-567890-12" />
              </div>
            </div>
          </section>

          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>결제 수단</h2>
            <div className={styles.paymentMethods}>
              <button className={`${styles.methodButton} ${styles.active}`}>신용카드</button>
              <button className={styles.methodButton}>카카오페이</button>
              <button className={styles.methodButton}>네이버페이</button>
              <button className={styles.methodButton}>실시간 계좌이체</button>
            </div>
            {/* Add credit card form here */}
          </section>

          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>약관 동의</h2>
            <div className={styles.termsList}>
              <div className={styles.termItem}>
                <label>
                  <input type="checkbox" />
                  <span>(필수) 개인정보 수집 및 이용 동의</span>
                </label>
                <a href="#" target="_blank">내용보기</a>
              </div>
              <div className={styles.termItem}>
                <label>
                  <input type="checkbox" />
                  <span>(필수) 자동차 대여 표준 약관 동의</span>
                </label>
                <a href="#" target="_blank">내용보기</a>
              </div>
              <div className={styles.termItem}>
                <label>
                  <input type="checkbox" />
                  <span>(필수) 취소 및 환불 규정 동의</span>
                </label>
                <a href="#" target="_blank">내용보기</a>
              </div>
            </div>
          </section>
        </div>

        {/* Summary Sidebar */}
        <aside className={styles.summary}>
          <div className={styles.summaryCard}>
            <h2 className={styles.sectionTitle}>예약 정보</h2>
            <div className={styles.carImage}></div>
            <h3 className={styles.carModel}>{reservationDetails.carModel}</h3>
            
            <div className={styles.detailList}>
              <div className={styles.detailItem}>
                <p>대여기간</p>
                <span>{reservationDetails.startDate} ~ {reservationDetails.endDate} ({reservationDetails.duration})</span>
              </div>
              <div className={styles.detailItem}>
                <p>대여장소</p>
                <span>{reservationDetails.location}</span>
              </div>
            </div>

            <div className={styles.priceBreakdown}>
              <h3 className={styles.sectionTitle}>결제 금액</h3>
              <div className={styles.priceItem}>
                <span>대여료</span>
                <span>{formatPrice(priceDetails.rental)}</span>
              </div>
              <div className={styles.priceItem}>
                <span>보험료</span>
                <span>{formatPrice(priceDetails.insurance)}</span>
              </div>
              <div className={`${styles.priceItem} ${styles.total}`}>
                <strong>총 결제금액</strong>
                <strong>{formatPrice(priceDetails.total)}</strong>
              </div>
            </div>
            <button className={styles.payButton}>
              {formatPrice(priceDetails.total)} 결제하기
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Payment;

// 주문자 정보, 주문상품, 결제수단