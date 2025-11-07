import React from 'react'
import ResponsiveLayout from '../../../layouts/ResponsiveLayout.tsx'
import ResponsiveSwitch from '../../../components/responsive/ResponsiveSwitch.tsx';

import Mobile from './reservation_mobile/reservation_mobile.tsx';
import Desktop from './reservation_desktop/reservation_desktop.tsx';
import { useLocation } from 'react-router-dom';

export default function Reservation() {
    const location = useLocation();
    const { address, reservationInfo: passedReservationInfo } = location.state || {};

    return (
        <>
            <ResponsiveSwitch
                mobileComponent={<Mobile />}
                desktopComponent={<Desktop address={address} reservationInfo={passedReservationInfo} />}
            />
        </>
    )
}
