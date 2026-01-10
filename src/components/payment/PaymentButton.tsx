// src/components/payment/PaymentButton.tsx
import React from 'react';
import * as PortOne from '@portone/browser-sdk/v2';
import styles from './PaymentButton.module.scss'; // 전용 스타일
import { PaymentVerifyRequest, verifyPayment } from '../../api/payment.ts';

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
      const payment = await PortOne.requestPayment({
        storeId: "store-558548a4-9f83-4965-ac3a-225064d9b111",
        channelKey: "channel-key-8516e90f-67c1-41f4-98f7-26f1f38ca046",
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
      });

      // 결제 취소 또는 실패 시
      if (payment.code != null) {
        return alert(`결제 실패: ${payment.message}`);
      }

      // 2. 백엔드에 결제 검증 및 데이터 저장 요청
      const verifyData: PaymentVerifyRequest = {
        paymentId: payment.paymentId, // 포트원에서 발급받은 ID
        totalPrice: 1000,           // 사용자가 결제한 금액
        carId: carId,
        userNum: userNum,
        rentalDatetime: rentalDatetime,
        returnDatetime: returnDatetime,
      };

      console.log(verifyData.carId);
      console.log(verifyData.userNum);
      console.log(verifyData.rentalDatetime);
      console.log(verifyData.returnDatetime);
      const result = await verifyPayment(verifyData);

      if (result) {
        alert("예약이 완료되었습니다!");
        onSuccess(payment.paymentId);
      } else {
        alert("결제 검증에 실패했습니다. 고객센터에 문의하세요.");
      }

    } catch (error: any) {
      console.error("결제 프로세스 에러:", error);
      // 백엔드에서 보낸 에러 메시지가 있다면 출력
      const errorMsg = error.response?.data?.message || "결제 처리 중 오류가 발생했습니다.";
      alert(errorMsg);
    }
  };

  return (
    <button className={styles.paymentBtn} onClick={handlePayment}>
      {amount.toLocaleString()}원 결제하기
    </button>
  );
};

export default PaymentButton;