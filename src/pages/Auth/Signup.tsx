import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import style from './Signup.module.scss';
import SignupProgress from "./SignupProgress.tsx";

const Signup = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');

  const [idMessage, setIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
  const [birthMessage, setBirthMessage] = useState('');

  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isBirth, setIsBirth] = useState(false);

  const navigate = useNavigate();

  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const idRegex = /^[a-zA-Z0-9]{6,20}$/;
    const idCurrent = e.target.value;
    setId(idCurrent);

    if (!idRegex.test(idCurrent)) {
      setIdMessage('6~20자의 영문 또는 숫자로 입력해주세요.');
      setIsId(false);
    } else {
      setIdMessage('올바른 아이디 형식입니다.');
      setIsId(true);
    }
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('8~12자의 영문, 숫자, 특수문자를 포함해주세요.');
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호입니다.');
      setIsPassword(true);
    }
  }, []);

  const onChangePasswordCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordCheckCurrent = e.target.value;
    setPasswordCheck(passwordCheckCurrent);

    if (password === passwordCheckCurrent) {
      setPasswordCheckMessage('비밀번호가 일치합니다.');
      setIsPasswordCheck(true);
    } else {
      setPasswordCheckMessage('비밀번호가 일치하지 않습니다.');
      setIsPasswordCheck(false);
    }
  }, [password]);

  const onChangeBirth = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const birthDate = new Date(e.target.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    let calculatedAge = age;
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      calculatedAge--;
    }

    setBirth(e.target.value);

    if (calculatedAge < 26) {
      setBirthMessage('만 26세 이상만 가입 가능합니다.');
      setIsBirth(false);
    } else {
      setBirthMessage('');
      setIsBirth(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !password || !passwordCheck || !email || !phone || !birth || !gender) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    if (isId && isPassword && isPasswordCheck && isBirth) {
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } else {
      alert('입력 정보를 다시 확인해주세요.');
    }
  };

  return (
    <>

      <form className={style.container} onSubmit={handleSubmit}>
        <SignupProgress step={2}/>
        <h2 className={style.title}>회원가입</h2>

        {/* 아이디 */}
        <div className={style.formGroup}>
          <label htmlFor="id" className={style.label}>아이디</label>
          <input
            type="text"
            id="id"
            className={style.input}
            placeholder="6~20자의 영문 또는 숫자"
            value={id}
            onChange={onChangeId}
          />
          {id.length > 0 && <p className={`${style.message} ${isId ? style.success : style.error}`}>{idMessage}</p>}
        </div>

        {/* 비밀번호 */}
        <div className={style.formGroup}>
          <label htmlFor="password" className={style.label}>비밀번호</label>
          <input
            type="password"
            id="password"
            className={style.input}
            placeholder="8~12자의 영문, 숫자, 특수문자 포함"
            value={password}
            onChange={onChangePassword}
          />
          {password.length > 0 && <p className={`${style.message} ${isPassword ? style.success : style.error}`}>{passwordMessage}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div className={style.formGroup}>
          <label htmlFor="passwordCheck" className={style.label}>비밀번호 확인</label>
          <input
            type="password"
            id="passwordCheck"
            className={style.input}
            placeholder="비밀번호를 다시 입력하세요"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
          {passwordCheck.length > 0 && <p className={`${style.message} ${isPasswordCheck ? style.success : style.error}`}>{passwordCheckMessage}</p>}
        </div>

        {/* 이메일 */}
        <div className={style.formGroup}>
          <label htmlFor="email" className={style.label}>이메일</label>
          <input
            type="email"
            id="email"
            className={style.input}
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* 전화번호 + 인증 */}
        <div className={style.formGroup}>
          <label htmlFor="phone" className={style.label}>전화번호</label>
          <div className={style.phoneRow}>
            <input
              type="tel"
              id="phone"
              className={style.input}
              placeholder="010-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button type="button" className={style.verifyButton}>
              인증번호 받기
            </button>
          </div>

          {/* 인증번호 입력 필드 */}
          <div className={style.verifyRow}>
            <input
              type="text"
              id="verificationCode"
              className={style.input}
              placeholder="인증번호 입력"
            />
            <button type="button" className={style.confirmButton}>
              확인
            </button>
          </div>
        </div>

        {/* 생년월일 */}
        <div className={style.formGroup}>
          <label htmlFor="birth" className={style.label}>생년월일</label>
          <input
            type="date"
            id="birth"
            className={style.input}
            value={birth}
            onChange={onChangeBirth}
          />
          {birth.length > 0 && <p className={`${style.message} ${isBirth ? style.success : style.error}`}>{birthMessage}</p>}
        </div>

        {/* 성별 */}
        <div className={style.formGroup}>
          <label className={style.label}>성별</label>
          <div className={style.genderGroup}>
            <label className={style.genderLabel}>
              <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />
              남성
            </label>
            <label className={style.genderLabel}>
              <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />
              여성
            </label>
          </div>
        </div>

        {/* 제출 버튼 */}
        <button type="submit" className={style.submitButton}>
          가입하기
        </button>
      </form>
    </>
  );
};

export default Signup;
