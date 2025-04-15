import clsx from 'clsx';
import styles from './checkbox.module.css';

import { InputHTMLAttributes } from 'react';
import { Check, Minus } from '@phosphor-icons/react';
import { SelectorSize } from '@ui/shared/types/selector-size';

type Props = {
  /**
   * The size of the checkbox
   */
  size?: SelectorSize;
  /**
   * Whether the checkbox is in an indeterminate state
   */
  indeterminate?: boolean;
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

/**
 * A customizable checkbox component that supports three states: checked, unchecked, and indeterminate. It can be used in forms or as a standalone control.
 */
export function Checkbox({
  size = 'medium',
  className,
  indeterminate,
  checked,
  onChange,
  ...props
}: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
  }

  return (
    <label className={styles['container']}>
      <input
        type="checkbox"
        className={clsx(styles['checkbox'], styles[size], className)}
        onChange={handleChange}
        checked={checked}
        ref={(input) => {
          if (input) {
            input.indeterminate = indeterminate ?? false;
          }
        }}
        {...props}
      />
      <span className={clsx(styles['icon'], styles[size])}>
        {indeterminate ? <Minus weight="bold" /> : <Check weight="bold" />}
      </span>
    </label>
  );
}
