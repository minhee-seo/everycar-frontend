import React, { useState, useEffect } from 'react';
import styles from './MypageInfo.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import MypageSide from './MypageSide.tsx';

const MyPage = () => {
  const { userNum, userName: reduxName, userId: reduxId } = useSelector((state: RootState) => state.user);
  
  // 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);
  
  // 유저 정보 상태 (초기값은 Redux나 기본값에서 가져옴)
  const [userInfo, setUserInfo] = useState({
    userId: reduxId || 'admin',
    userName: reduxName || '홍길동',
    userEmail: 'admin@everycar.com',
    userPhone: '01012345678',
    userGender: 1, // 1: 남, 2: 여
    userBirth: '1995-05-20',
    userAddress: '서울특별시 강남구 테헤란로 123',
    userStatus: 1
  });

  // 수정 취소 시 되돌리기 위한 백업 데이터
  const [backupInfo, setBackupInfo] = useState({ ...userInfo });

  // 전화번호 포맷팅 (출력용)
  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  // 성별 변경 핸들러 (수정 모드일 때만 작동)
  const handleGenderChange = (gender: number) => {
    if (!isEditMode) return;
    setUserInfo(prev => ({ ...prev, userGender: gender }));
  };

  // 수정 시작
  const handleEditStart = () => {
    setBackupInfo({ ...userInfo }); // 현재 상태 백업
    setIsEditMode(true);
  };

  // 수정 취소
  const handleCancel = () => {
    setUserInfo({ ...backupInfo }); // 백업본으로 복구
    setIsEditMode(false);
  };

  // 수정 저장 (추후 API 연동)
  const handleSave = async () => {
    try {
      // 여기에 axios.put('/api/user/update', userInfo) 로직 추가 예정
      console.log("저장될 데이터:", userInfo);
      setIsEditMode(false);
      alert("정보가 수정되었습니다.");
    } catch (error) {
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      <div className={styles.myPageWrapper}>
        {/* 사이드 메뉴 */}
        <MypageSide />

        {/* 메인 콘텐츠 */}
        <main className={styles.content}>
          <header className={styles.header}>
            <h3>개인정보 관리</h3>
            <p>회원님의 정보를 안전하게 관리하세요.</p>
          </header>

          <section className={styles.infoSection}>
            {/* 아이디 - 절대 수정 불가 */}
            <div className={styles.inputGroup}>
              <label>아이디 (수정 불가)</label>
              <input 
                type="text" 
                value={userInfo.userId} 
                readOnly 
                className={styles.permanentReadOnly} 
              />
            </div>

            {/* 이름 - 절대 수정 불가 */}
            <div className={styles.inputGroup}>
              <label>이름 (수정 불가)</label>
              <input 
                type="text" 
                value={userInfo.userName} 
                readOnly 
                className={styles.permanentReadOnly} 
              />
            </div>

            {/* 이메일 */}
            <div className={styles.inputGroup}>
              <label>이메일</label>
              <input
                type="email"
                name="userEmail"
                value={userInfo.userEmail}
                onChange={handleChange}
                readOnly={!isEditMode}
                className={!isEditMode ? styles.readOnly : styles.editInput}
              />
            </div>

            {/* 휴대폰 번호 */}
            <div className={styles.inputGroup}>
              <label>휴대폰 번호</label>
              <input
                type="text"
                name="userPhone"
                value={isEditMode ? userInfo.userPhone : formatPhone(userInfo.userPhone)}
                onChange={handleChange}
                readOnly={!isEditMode}
                className={!isEditMode ? styles.readOnly : styles.editInput}
                placeholder="숫자만 입력해 주세요"
              />
            </div>

            <div className={styles.row}>
              {/* 성별 */}
              <div className={styles.inputGroup}>
                <label>성별</label>
                <div className={`${styles.genderGroup} ${!isEditMode ? styles.readOnlyGender : ''}`}>
                  <button 
                    type="button"
                    className={userInfo.userGender === 1 ? styles.selected : ''}
                    onClick={() => handleGenderChange(1)}
                  >
                    남성
                  </button>
                  <button 
                    type="button"
                    className={userInfo.userGender === 2 ? styles.selected : ''}
                    onClick={() => handleGenderChange(2)}
                  >
                    여성
                  </button>
                </div>
              </div>

              {/* 생년월일 */}
              <div className={styles.inputGroup}>
                <label>생년월일</label>
                <input 
                  type="date" 
                  name="userBirth"
                  value={userInfo.userBirth} 
                  onChange={handleChange}
                  readOnly={!isEditMode}
                  className={!isEditMode ? styles.readOnly : styles.editInput}
                />
              </div>
            </div>

            {/* 주소 */}
            <div className={styles.inputGroup}>
              <label>주소</label>
              <div className={styles.withButton}>
                <input 
                  type="text" 
                  name="userAddress"
                  value={userInfo.userAddress} 
                  onChange={handleChange}
                  readOnly={!isEditMode}
                  className={!isEditMode ? styles.readOnly : styles.editInput}
                  placeholder="주소를 입력하세요"
                />
                {isEditMode && (
                  <button type="button" className={styles.outlineBtn}>주소찾기</button>
                )}
              </div>
            </div>
          </section>

          {/* 하단 버튼 영역 */}
          <footer className={styles.actionButtons}>
            {!isEditMode ? (
              <button
                type="button"
                className={styles.editStartBtn}
                onClick={handleEditStart}
              >
                정보 수정하기
              </button>
            ) : (
              <div className={styles.editActions}>
                <button type="button" className={styles.saveBtn} onClick={handleSave}>
                  변경사항 저장
                </button>
                <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
                  취소
                </button>
              </div>
            )}
            <button type="button" className={styles.withdrawBtn}>회원 탈퇴</button>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default MyPage;