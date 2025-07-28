// src/components/responsive/ResponsiveSwitch.tsx
import { useMediaQuery } from 'react-responsive';

interface ResponsiveSwitchProps {
  mobileComponent: React.ReactElement;
  desktopComponent: React.ReactElement;
  breakpoint?: number;
}

const ResponsiveSwitch: React.FC<ResponsiveSwitchProps> = ({
  mobileComponent,
  desktopComponent,
  breakpoint = 768,
}) => {
  const isMobile = useMediaQuery({ maxWidth: breakpoint });

  return isMobile ? mobileComponent : desktopComponent;
};

export default ResponsiveSwitch;