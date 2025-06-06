import clsx from 'clsx';

import iconSizeStyles from '../styles/icon-size.module.css';
import borderRadiusStyles from '../styles/border-radius.module.css';
import paddingStyles from '../styles/icon-padding.module.css';
import navButtonStyles from './nav-button.module.css';

import { Shape, BaseButtonProps } from '../types';
import { BaseButton } from '../base-button/base-button';
import { forwardRef } from 'react';
import { Size } from '@ui/shared/types/size';

type NavButtonProps = {
  /** The icon to display in the button */
  icon: React.ReactNode;
  /** The shape of the button */
  shape?: Shape;
  /** Whether to hide the background */
  noBackground?: boolean;
};

/**
 * NavButton is a specialized button component designed for navigation purposes.
 * Features: accepts any React node as an icon, supports extended size range (from xxxx-small to large),
 * customizable shapes (circle or default), optional background removal for transparent styling,
 * maintains accessibility through BaseButton inheritance, and fully customizable through standard button props.
 * Unlike IconButton, NavButton is specifically optimized for navigation contexts with more granular size control.
 * Also the button has a distinct appearance with only the content visible in default state.
 */
export const NavButton = forwardRef<
  HTMLButtonElement,
  Omit<BaseButtonProps<NavButtonProps>, 'size'> & { size?: Size }
>(({ size = 'medium', shape = '', icon, noBackground, ...props }, ref) => (
  <BaseButton
    ref={ref}
    styles={clsx(
      navButtonStyles['nav-button'],
      { [navButtonStyles['no-background']]: noBackground },
      paddingStyles[size],
      iconSizeStyles[size],
      borderRadiusStyles[shape],
      borderRadiusStyles[size],
    )}
    {...props}
  >
    {icon}
  </BaseButton>
));
