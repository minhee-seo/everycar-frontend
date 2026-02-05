import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './MypageReservationDetail.module.scss';
import MypageSide from './MypageSide';
import { userApi } from '../../api/mypageUserApi'; // API 불러오기
import { ReservationDetail as IDetail } from '../../types/mypage/ReservationDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import CarNameMapper from '../../utils/carnamemapper';

const ReservationDetail = () => {
  const { id } = useParams<{ id: string }>(); // URL 파라미터 :id 추출
  const navigate = useNavigate();
  const [detail, setDetail] = useState<IDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        // API 호출: 백엔드에서 데이터 가져오기
        const data = await userApi.getReservationDetail(Number(id));
        setDetail(data);
      } catch (error: any) {
        console.error("상세 정보 로드 실패:", error);
        alert("예약 정보를 불러오는 데 실패했습니다.");
        navigate('/myPage/reservations'); // 실패 시 목록으로 리다이렉트
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, navigate]);

  // 로딩 및 예외 처리
  if (loading) return <div className={styles.loadingContainer}>데이터를 불러오는 중입니다...</div>;
  if (!detail) return <div className={styles.errorContainer}>해당 예약 내역을 찾을 수 없습니다.</div>;

  return (
    <div className="container">
      <div className={styles.pageWrapper}>
        <MypageSide />

        <main className={styles.content}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} /> 목록으로 돌아가기
          </button>

          <header className={styles.detailHeader}>
            <div className={styles.titleArea}>
              <h2>예약 상세 내역</h2>
              <span className={`${styles.statusBadge} ${styles[detail.status]}`}>
                {detail.status}
              </span>
            </div>
            <p className={styles.resNum}>예약번호: {detail.reservationId}</p>
          </header>

          {/* 이하 섹션들은 detail 객체의 데이터를 바인딩하여 출력 */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>차량 정보</h3>
            <div className={styles.carInfoCard}>
              <img
                src={`/main/car/${CarNameMapper(detail.carName)}.png`}
                alt={detail.carName}
              />
              <div className={styles.carText}>
                <span className={styles.brand}>{detail.brand}</span>
                <h4>{detail.carName}</h4>
                <p>{detail.fuel} · 자동변환</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>이용 정보</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.iconLabel}><FontAwesomeIcon icon={faClock} /> 대여 일시</div>
                <p>{detail.rentalDate}</p>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iconLabel}><FontAwesomeIcon icon={faClock} /> 반납 일시</div>
                <p>{detail.returnDate}</p>
              </div>
              <div className={styles.infoItem + ' ' + styles.fullWidth}>
                <div className={styles.iconLabel}><FontAwesomeIcon icon={faMapMarkerAlt} /> 대여/반납 장소</div>
                <p><strong>{detail.parkingName}</strong></p>
                <p className={styles.address}>{detail.parkingAddress}</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>결제 상세</h3>
            <div className={styles.paymentCard}>
              <div className={styles.priceRow}>
                <span>총 결제금액</span>
                <strong className={styles.totalPrice}>{detail.totalPrice?.toLocaleString()}원</strong>
              </div>
              <div className={styles.priceRow}>
                <span>결제 일시</span>
                <span>{detail.createdAt}</span>
              </div>
              <div className={styles.priceRow}>
                <span>결제 번호 (Payment ID)</span>
                <span className={styles.paymentId}>{detail.paymentId}</span>
              </div>
            </div>
          </section>

          <div className={styles.actions}>
            {detail.status === '이용예정' && (
              <button className={styles.cancelBtn} onClick={() => {/* 환불 함수 연결 */ }}>
                예약 취소하기
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReservationDetail;