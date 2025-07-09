import clsx from 'clsx';
import styles from './accordion.module.css';

import { forwardRef, useState } from 'react';
import { Separator } from '../separator/separator';
import { WithIcon } from '../../shared/types/with-icon';
import { Collapsible } from '../collapsible/collapsible';

export type AccordionProps = React.HTMLAttributes<HTMLDivElement> &
  WithIcon & {
    /**
     * Text displayed in the header
     */
    label: string;

    /**
     * Contents of the collapsible section
     */
    children: React.ReactNode;

    /**
     * True if not collapsed
     */
    isOpen?: boolean;

    /**
     * Callback run when the open state changes
     */
    onToggleOpen?: (isOpen: boolean) => void;

    /**
     * Initial open state
     */
    defaultOpen?: boolean;
  };

/**
 * An interactive UI component that lets users toggle the visibility of content.
 * The content section can be expanded to reveal details and collapsed to hide them,
 * keeping information organized and saving space. Commonly used in FAQs, settings panels,
 * and documentation to present layered content efficiently.
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      label,
      children,
      onToggleOpen,
      isOpen: isOpenProp,
      defaultOpen = true,
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const isExpanded = isOpenProp ?? isOpen;

    function onExpandCollapse() {
      const newValue = !isExpanded;

      setIsOpen(newValue);
      onToggleOpen?.(newValue);
    }

    return (
      <Collapsible
        defaultExpanded={defaultOpen}
        isExpanded={isExpanded}
        onToggle={onExpandCollapse}
      >
        <div
          ref={ref}
          className={clsx(styles['accordion'], className)}
          {...props}
        >
          <div
            className={clsx(styles['header'], {
              [styles['expanded']]: isExpanded,
            })}
            onClick={onExpandCollapse}
            aria-expanded={isOpen}
          >
            <span className="ax-public-h10">{label}</span>
            <Collapsible.Button />
          </div>
          <Collapsible.Content>
            <div className={styles['inner-content']}>{children}</div>
          </Collapsible.Content>
          <Separator />
        </div>
      </Collapsible>
    );
  },
);
