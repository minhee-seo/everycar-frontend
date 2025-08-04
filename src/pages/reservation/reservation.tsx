import React from 'react'
import ResponsiveLayout from '../../layouts/ResponsiveLayout'
import ResponsiveSwitch from '../../components/responsive/ResponsiveSwitch.tsx';

import Mobile from './reservation_mobile/reservation_mobile.tsx';
import Desktop from './reservation_desktop/reservation_desktop.tsx';

export default function reservation() {
    return (
        <>
            <ResponsiveSwitch
                mobileComponent={<Mobile />}
                desktopComponent={<Desktop />}
            />
        </>
    )
}
