import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faClipboardCheck, faComments, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

import styled from './ShortCut.module.scss';

function ShortCut() {
    return (
        <div className={styled.serviceShortcut} data-aos="fade-up" data-aos-duration="1000" >
            <h4 className={styled.serviceShortcutTitle}>서비스<br />바로가기</h4>
            <nav className={styled.shortcutContainer}>
                <ShortcutBox
                    to='/myPage/history' /* URL 연동 */
                    ico={faCar}
                    title='차량 예약'
                    subscript='1일 렌트부터 4개월까지 원하는 만큼 최저가 보장 '
                />
                <ShortcutBox
                    to='/support/event'
                    ico={faClipboardCheck}
                    title='내 예약 확인'
                    subscript='예약 내역과 진행상황을 확인해요'
                />
                <ShortcutBox
                    to='/support/inquiry'
                    ico={faComments}
                    title='1:1 채딩 상담'
                    subscript='사고접수 또는 예약 상담'
                />
                <ShortcutBox
                    to='/support/Estimate'
                    ico={faFileInvoiceDollar}
                    title='견적확인'
                    subscript=''
                />
            </nav>
        </div>
    );
}
function ShortcutBox({ to, ico, title, subscript }) {
    return (
        <Link className={styled.shortcutBox} to={to}>
            <div className={styled.icon}>
                <FontAwesomeIcon icon={ico} style={{ fontSize: "40px" }} />
            </div>
            <div className={styled.text}>
                <p className={styled.title}>{title}</p>
                <p className={styled.subscript}>{subscript}</p>
            </div>
        </Link>
    );
}
export default ShortCut
