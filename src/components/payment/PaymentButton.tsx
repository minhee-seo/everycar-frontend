// src/components/payment/PaymentButton
import React from 'react';
import * as PortOne from '@portone/browser-sdk/v2';
import styles from './PaymentButton.module.scss'; // 전용 스타일
import { PaymentVerifyRequest, verifyPayment } from '../../api/payment';

interface PaymentButtonProps {
  amount: number;
  orderName: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  carId: number;
  userNum: number;
  rentalDatetime: string;
  returnDatetime: string;
  onSuccess: (paymentId: string | undefined) => void;
  payMethod: string;
}

const PaymentButton = ({
  amount,
  orderName,
  customer,
  carId,
  userNum,
  rentalDatetime,
  returnDatetime,
  onSuccess,
  payMethod
}: PaymentButtonProps) => {

  const handlePayment = async () => {
    try {
      const redirectUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;

      const payment = await PortOne.requestPayment({
        storeId: process.env.REACT_APP_PORTONE_STORE_ID!,
        channelKey: process.env.REACT_APP_PORTONE_CHANNEL_KEY!,
        paymentId: `order_${new Date().getTime()}`,
        orderName: orderName,
        totalAmount: 1000,
        currency: "CURRENCY_KRW",
        payMethod: payMethod === 'card' ? "CARD" : "EASY_PAY",
        customer: {
          fullName: customer.name,
          phoneNumber: customer.phone,
          email: customer.email || "test@example.com",
        },
        redirectUrl: redirectUrl,
      });

      // 모바일 리다이렉트 시 아무것도 반환하지 않을 경우
      if (!payment) return;

      // 데스크탑 전용 팝업 방식
      if (payment) {
        if (payment.code != null) return alert(`결제 실패: ${payment.message}`);
        await handleVerification(payment.paymentId);
      }

      // 결제 취소 또는 실패 시
      if (payment.code != null) {
        return alert(`결제 실패: ${payment.message}`);
      }

      // 결제 성공 시 검증
      await handleVerification(payment.paymentId);


    } catch (error: any) {
      console.error("결제 프로세스 에러:", error);
      const errorMsg = error.response?.data?.message || "결제 처리 중 오류가 발생했습니다.";
      alert(errorMsg);
    }
  };

  const handleVerification = async (paymentId: string) => {
    const verifyData: PaymentVerifyRequest = {
      paymentId,
      totalPrice: 1000,
      carId,
      userNum,
      rentalDatetime,
      returnDatetime,
    };
    const result = await verifyPayment(verifyData);

    if (result) {
      alert("예약이 완료되었습니다!");
      onSuccess(paymentId);
    } else {
      alert("결제 검증에 실패했습니다. 고객센터에 문의하세요.");
    }
  }

  return (
    <button className={styles.paymentBtn} onClick={handlePayment}>
      {amount.toLocaleString()}원 결제하기
    </button>
  );
};

export default PaymentButton;