import { faCircleCheck, faCreditCard, faMobileScreenButton, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { reservationService } from '../../api/reservationService';
import PaymentButton from '../../components/payment/PaymentButton';
import { RootState } from '../../store/index.js';
import CarNameMapper from '../../utils/carnamemapper';
import styles from './ContractDesktop.module.scss';
import { ContractDetailsResponse } from '../../types/contract/cantract';

function ContractDesktop() {
  const navigate = useNavigate();
  const location = useLocation();

  // 파라미터에서 car 정보 추출
  const queryParams = new URLSearchParams(location.search);
  const carId = queryParams.get('carId');
  const parkingId = queryParams.get('parkingId');
  const rentalDatetime = queryParams.get('rentalDatetime');
  const returnDatetime = queryParams.get('returnDatetime');

  // 유저 정보 불러오기 
  const { userName, userId, userNum } = useSelector((state: RootState) => state.user);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [contractData, setContractData] = useState<ContractDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  //  휴대폰 번호를 3개의 객체로 관리
  const [driverInfo, setDriverInfo] = useState({
    name: userName || '',
    phone1: '010',
    phone2: '',
    phone3: '',
    license: '제 1종 보통 / 12-34-567890-11'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 숫자만 입력 가능하도록 제한
    if (name.startsWith('phone') && !/^\d*$/.test(value)) return;

    setDriverInfo(prev => ({ ...prev, [name]: value }));

    // 글자 수 충족 시 다음 칸으로 자동 포커스 이동
    if (name === 'phone2' && value.length === 4) {
      document.getElementById('phone3')?.focus();
    }
  };

  useEffect(() => {
    if (userName) {
      setDriverInfo(prev => ({ ...prev, name: userName }));
    }
  }, [userName]);

  useEffect(() => {
    // 오류처리
    if (!carId || !parkingId) {
      navigate(-1);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        const data = await reservationService.getContractDetails({
          carId: Number(carId),
          userNum: Number(userNum),
          parkingId: Number(parkingId)
        });
        setContractData(data);

        // 전화번호 파싱
        const rawPhone = data.userDTO?.userPhone || "";
        if (rawPhone) {
          const p1 = rawPhone.substring(0, 3);
          const p2 = rawPhone.length === 11 ? rawPhone.substring(3, 7) : rawPhone.substring(3, 6);
          const p3 = rawPhone.length === 11 ? rawPhone.substring(7, 11) : rawPhone.substring(6, 10);

          setDriverInfo(prev => ({
            ...prev,
            name: data.userDTO?.userName || prev.name,
            phone1: p1, phone2: p2, phone3: p3
          }));
        }
      } catch (error) {
        console.error("데이터 로드 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [carId, parkingId, userNum]);

  const handlePaymentSuccess = (paymentId?: string) => {
    if (!paymentId) {
      console.warn("결제 ID가 없습니다.");
    }
    alert("예약이 확정되었습니다.");
    navigate('/myPage/reservations');
  };

  if (loading) return <div>로딩 중...</div>;
  if (!contractData) return <div>데이터가 없습니다.</div>;

  const { carDto, totalPrice, userDTO } = contractData;

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
              <div className={styles.carImage}>
                <img
                  src={`/main/car/${CarNameMapper(carDto.model.model_name)}.png`}
                  alt={carDto.model.model_name}
                />
              </div>

              <div className={styles.carText}>
                <span className={styles.badge}>{carDto.car_fuel}</span>
                <h4>{carDto.model.model_brand} {carDto.model.model_name}</h4>
                <div className={styles.gridInfo}>
                  <div className={styles.infoRow}>
                    <div className={styles.infoItem}>
                      <span>대여 일시</span>
                      <p>{rentalDatetime}</p>
                    </div>
                    <div className={styles.infoItem}>
                      <span>반납 일시</span>
                      <p>{returnDatetime}</p>
                    </div>
                  </div>
                  <div className={styles.fullWidth}>
                    <span>대여 및 반납 장소</span>
                    <p>{carDto.parking?.parking_name} ({carDto.parking?.parking_address})</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. 운전자 정보 */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>운전자 정보</h3>
            <div className={styles.infoInputTable}>
              <div className={styles.inputRow}>
                <label>예약자명</label>
                <input
                  type="text"
                  name="name"
                  value={driverInfo.name}
                  onChange={handleInputChange}
                  placeholder="성함을 입력하세요"
                />
              </div>
              <div className={styles.inputRow}>
                <label>휴대폰 번호</label>
                <div className={styles.phoneInputGroup}>
                  <input
                    type="text"
                    name="phone1"
                    maxLength={3}
                    value={driverInfo.phone1}
                    onChange={handleInputChange}
                  />
                  <span className={styles.dash}>-</span>
                  <input
                    type="text"
                    name="phone2"
                    id="phone2"
                    maxLength={4}
                    value={driverInfo.phone2}
                    onChange={handleInputChange}
                  />
                  <span className={styles.dash}>-</span>
                  <input
                    type="text"
                    name="phone3"
                    id="phone3"
                    maxLength={4}
                    value={driverInfo.phone3}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={styles.inputRow}>
                <label>면허 정보</label>
                <input
                  type="text"
                  name="license"
                  value={driverInfo.license}
                  onChange={handleInputChange}
                  placeholder="면허 정보를 입력하세요"
                  readOnly
                />
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

            <PaymentButton
              amount={97400} // contractData에서 계산된 값
              orderName={`${carDto.model.model_brand} 대여`}
              payMethod={paymentMethod}
              customer={{
                name: driverInfo.name,
                phone: `${driverInfo.phone1}${driverInfo.phone2}${driverInfo.phone3}`,
                email: userDTO?.userEmail || ""
              }}
              carId={Number(carId)}
              userNum={Number(userNum)}
              rentalDatetime={rentalDatetime || ""}
              returnDatetime={returnDatetime || ""}
              onSuccess={handlePaymentSuccess}
            />
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
