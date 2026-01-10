// src/components/payment/PaymentButton.tsx
import React from 'react';
import * as PortOne from '@portone/browser-sdk/v2';
import styles from './PaymentButton.module.scss'; // 전용 스타일

interface PaymentButtonProps {
  amount: number;
  orderName: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  onSuccess: (paymentId: string) => void;
  payMethod: string;
}

const PaymentButton = ({ amount, orderName, customer, onSuccess, payMethod }: PaymentButtonProps) => {

  const handlePayment = async () => {
    try {
      const payment = await PortOne.requestPayment({
        storeId: process.env.REACT_APP_PORTONE_STORE_ID as string,
        channelKey: process.env.REACT_APP_PORTONE_CHANNEL_KEY as string,
        paymentId: `order_${new Date().getTime()}`,
        orderName: orderName,
        totalAmount: amount,
        currency: "CURRENCY_KRW",
        payMethod: payMethod === 'card' ? "CARD" : "EASY_PAY",
        customer: {
          fullName: customer.name,
          phoneNumber: customer.phone,
          email: customer.email || "test@example.com",
        },
      });

      if (payment.code != null) {
        return alert(`결제 실패: ${payment.message}`);
      }

      // 결제 성공 시 부모 컴포넌트에게 paymentId 전달
      onSuccess(payment.paymentId);

    } catch (error) {
      console.error(error);
      alert("결제창을 여는 중 오류가 발생했습니다.");
    }
  };

  return (
    <button className={styles.paymentBtn} onClick={handlePayment}>
      {amount.toLocaleString()}원 결제하기
    </button>
  );
};

export default PaymentButton;