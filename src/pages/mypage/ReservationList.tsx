import React, { useState, useEffect } from 'react';
import styles from './ReservationList.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import MypageSide from './MypageSide.tsx';

// 예약 상태 타입 정의
type ReservationStatus = '전체' | '이용예정' | '이용중' | '반납완료' | '취소됨';

interface ReservationItem {
  id: number;
  carName: string;
  brand: string;
  fuel: string;
  rentalDate: string;
  returnDate: string;
  parkingName: string;
  totalPrice: number;
  status: ReservationStatus;
  carImg: string;
}

const ReservationList = () => {
  const { userNum } = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = useState<ReservationStatus>('전체');

  // 샘플 데이터 (추후 API 연동)
  const [reservations] = useState<ReservationItem[]>([
    {
      id: 101,
      carName: 'EV3',
      brand: '기아',
      fuel: '전기',
      rentalDate: '2024-10-25 14:00',
      returnDate: '2024-10-26 14:00',
      parkingName: '소하동 제1노외',
      totalPrice: 122400,
      status: '이용예정',
      carImg: '/sample-car.png'
    },
    {
      id: 98,
      carName: '아반떼 CN7',
      brand: '현대',
      fuel: '가솔린',
      rentalDate: '2024-09-10 10:00',
      returnDate: '2024-09-11 10:00',
      parkingName: '광명역 KTX 주차장',
      totalPrice: 85000,
      status: '반납완료',
      carImg: '/sample-car.png'
    }
  ]);

  const filteredList = activeTab === '전체' 
    ? reservations 
    : reservations.filter(item => item.status === activeTab);

  const getStatusClass = (status: string) => {
    switch(status) {
      case '이용예정': return styles.statusReady;
      case '이용중': return styles.statusIng;
      case '반납완료': return styles.statusDone;
      default: return styles.statusCancel;
    }
  };

  return (
    <div className="container">
      <div className={styles.pageWrapper}>
        <MypageSide />

        <main className={styles.content}>
          <header className={styles.header}>
            <h3>예약 내역</h3>
            <p>회원님이 이용하신 EveryCar 예약 기록입니다.</p>
          </header>

          {/* 탭 메뉴 */}
          <nav className={styles.tabNav}>
            {['전체', '이용예정', '이용중', '반납완료'].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? styles.activeTab : ''}
                onClick={() => setActiveTab(tab as ReservationStatus)}
              >
                {tab}
              </button>
            ))}
          </nav>

          <section className={styles.listSection}>
            {filteredList.length > 0 ? (
              filteredList.map((item) => (
                <div key={item.id} className={styles.reservationCard}>
                  <div className={styles.cardHeader}>
                    <span className={`${styles.statusBadge} ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                    <span className={styles.resId}>예약번호 {item.id}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <img src={item.carImg} alt={item.carName} className={styles.carThumb} />
                    <div className={styles.infoText}>
                      <span className={styles.carBrand}>{item.brand}</span>
                      <h4>{item.carName} ({item.fuel})</h4>
                      <div className={styles.dateInfo}>
                        <p><strong>대여:</strong> {item.rentalDate}</p>
                        <p><strong>반납:</strong> {item.returnDate}</p>
                        <p><strong>장소:</strong> {item.parkingName}</p>
                      </div>
                    </div>
                    <div className={styles.priceArea}>
                      <span className={styles.priceLabel}>결제금액</span>
                      <strong className={styles.priceValue}>{item.totalPrice.toLocaleString()}원</strong>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <button className={styles.detailBtn}>상세보기</button>
                    {item.status === '이용예정' && (
                      <button className={styles.cancelBtn}>예약취소</button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>해당하는 예약 내역이 없습니다.</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default ReservationList;