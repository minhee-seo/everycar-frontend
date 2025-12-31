import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './ContractDesktop.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCreditCard, faMobileScreenButton, faWallet, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { reservationService } from '../../api/reservationService.ts';

function ContractDesktop() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [contractData, setContractData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // 테스트용 파라미터
        const data = await reservationService.getContractDetails({
          carId: 402,
          userNum: 1,
          parkingId: 14
        });
        setContractData(data);
      } catch (error) {
        console.error("데이터 로드 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (!contractData) return <div>데이터가 없습니다.</div>;

  const { carDto, totalPrice } = contractData;

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.contractContainer}>
        {/* 왼쪽 영역: 정보 입력 */}
        <div className={styles.leftContent}>
          <header className={styles.header}>
            <h2>예약 확인 및 계약</h2>
            <p>대여소 및 운전자 정보를 확인해 주세요.</p>
          </header>

          {/* 1. 예약 차량/장소 정보 */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>예약 정보</h3>
            <div className={styles.carInfoDetail}>
              <img src="/sample-car.png" alt="car" className={styles.carImg} />
              <div className={styles.carText}>
                <span className={styles.badge}>{carDto.car_fuel}</span>
                <h4>{carDto.model.model_brand} {carDto.model.model_name}</h4>
                <div className={styles.gridInfo}>
                  {/* 날짜는 필요시 포맷팅 함수 사용 */}
                  <div className={styles.fullWidth}>
                    <span>대여 및 반납 장소</span>
                    <p>{carDto.parking.parking_name} ({carDto.parking.parking_address})</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. 운전자 정보 (로그인 정보 연동 예정) */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>운전자 정보</h3>
            <div className={styles.infoTable}>
              <div className={styles.row}>
                <label>예약자명</label>
                <p>홍길동</p>
              </div>
              <div className={styles.row}>
                <label>휴대폰 번호</label>
                <p>010-1234-5678</p>
              </div>
              <div className={styles.row}>
                <label>면허 정보</label>
                <p>제 1종 보통 / 12-34-567890-11</p>
              </div>
            </div>
          </section>

          {/* 3. 결제 수단 */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>결제 수단 선택</h3>
            <div className={styles.methodGrid}>
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
              <button
                className={`${styles.methodBtn} ${paymentMethod === 'naver' ? styles.active : ''}`}
                onClick={() => setPaymentMethod('naver')}
              >
                <FontAwesomeIcon icon={faWallet} />
                <span>네이버페이</span>
              </button>
            </div>
          </section>
        </div>

        {/* 오른쪽 영역: 결제 요약 (Sticky) */}
        <aside className={styles.rightSidebar}>
          <div className={styles.stickyBox}>
            <h3 className={styles.sidebarTitle}>결제 상세</h3>
            <div className={styles.priceDetail}>
              <div className={styles.priceRow}>
                <span>대여 요금 (24시간)</span>
                <span>85,000원</span>
              </div>
              <div className={styles.priceRow}>
                <span>면책 보험료 (라이트)</span>
                <span>12,400원</span>
              </div>
              <div className={styles.priceRow}>
                <span>할인 금액</span>
                <span className={styles.discount}>-0원</span>
              </div>
              <div className={styles.totalRow}>
                <span>최종 결제 금액</span>
                <strong>97,400원</strong>
              </div>
            </div>

            <div className={styles.agreement}>
              <div className={styles.agreeItem}>
                <FontAwesomeIcon icon={faCircleCheck} className={styles.checkIcon} />
                <span>취소 및 환불 규정 동의 (필수)</span>
              </div>
              <div className={styles.agreeItem}>
                <FontAwesomeIcon icon={faCircleCheck} className={styles.checkIcon} />
                <span>자동차 대여 약관 동의 (필수)</span>
              </div>
            </div>

            <button className={styles.paymentBtn}>
              97,400원 결제하기
            </button>
            <p className={styles.notice}>
              * 차량 대여 시점에 결제가 진행됩니다.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default ContractDesktop
