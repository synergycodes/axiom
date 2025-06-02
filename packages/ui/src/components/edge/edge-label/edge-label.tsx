import clsx from 'clsx';
import styles from './edge-label.module.css';
import sizeStyles from './edge-label-size.module.css';

import { PropsWithChildren, HTMLAttributes, forwardRef } from 'react';
import { EdgeLabelSize, EdgeState } from '../types';

type EdgeProps = {
  size?: EdgeLabelSize;
  isHovered?: boolean;
  /**
   * Determines the layout style for the EdgeLabel based on its content:
   *
   * text: Simple text label.
   * icon: Single icon without additional content.
   * compound: Mixed content like icons + text, multiple icons, etc.
   */
  type?: EdgeLabelType;
  /**
   * The visual state of the edge. Determines base styles like `strokeWidth`.
   */
  state?: EdgeState;
};

type EdgeLabelType = 'text' | 'icon' | 'compound';

/*
 * A dedicated label component designed for use on an edge within a diagram.
 * The `EdgeLabel` component provides a consistent and unified design, following the styling conventions prepared for edges.
 * The state of the label (such as hover, selection, and disabled) is managed externally.
 * Therefore, dedicated props are exposed to reflect these states visually.
 *
 * The component extends a standard `HTMLDivElement`, enabling flexibility in layout and positioning.
 * For example, you can use CSS transforms or absolute positioning to control the label's placement on the edge.
 * The content of the label can be any valid `ReactNode`, allowing full customization.
 */
export const EdgeLabel = forwardRef<
  HTMLDivElement,
  PropsWithChildren<EdgeProps & HTMLAttributes<HTMLDivElement>>
>(
  (
    {
      children,
      size = 'medium',
      isHovered,
      state = 'default',
      type = 'text',
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        {...rest}
        className={clsx(
          styles['container'],
          styles[state],
          sizeStyles[type],
          sizeStyles[size],
          {
            [styles['hovered']]: isHovered,
          },
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
