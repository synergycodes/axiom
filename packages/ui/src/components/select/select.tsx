import clsx from 'clsx';
import selectButtonStyles from './select-button/select-button.module.css';
import listBoxStyles from '@ui/shared/styles/list-box.module.css';
import inputFontStyles from '@ui/shared/styles/input-font-size.module.css';
import inputSizeStyles from '@ui/shared/styles/input-size.module.css';
import style from './select.module.css';

import { Select as SelectBase } from '@mui/base/Select';
import { UseSelectParameters } from '@mui/base';
import { SelectValue } from './select-value/select-value';
import { SelectButton } from './select-button/select-button';
import { SelectOption } from './select-option/select-option';
import { SelectItem } from './types';
import { ItemSize } from '../../shared/types/item-size';
import { Separator } from '../separator/separator';

export type SelectBaseProps = UseSelectParameters<string | number | null> & {
  /**
   * Size of the select input
   */
  size?: ItemSize;
  /**
   * Placeholder text for the select input
   */
  placeholder?: string;
  /**
   * List of items to display in the select dropdown
   */
  items: SelectItem[];
};

/**
 * Component for displaying a select dropdown with customizable size, placeholder, and item list
 */
export function Select({
  size = 'medium',
  items,
  placeholder,
  ...props
}: SelectBaseProps) {
  const slotProps = {
    root: {
      className: clsx(
        selectButtonStyles['container'],
        inputFontStyles[size],
        inputSizeStyles[size],
      ),
    },
    listbox: { className: listBoxStyles['list-box'] },
    popup: {
      disablePortal: true,
      className: clsx(listBoxStyles['popup'], style['popup']),
    },
  };

  return (
    <div className={style['container']}>
      <SelectBase
        renderValue={(option) => (
          <SelectValue
            selectedOptionLabel={option}
            items={items}
            placeholder={placeholder}
          />
        )}
        slots={{ root: SelectButton }}
        slotProps={slotProps}
        {...props}
      >
        {items.map((item, index) =>
          item.type === 'separator' ? (
            <Separator key={index} />
          ) : (
            <SelectOption key={item.value} {...item} size={size} />
          ),
        )}
      </SelectBase>
    </div>
  );
}
