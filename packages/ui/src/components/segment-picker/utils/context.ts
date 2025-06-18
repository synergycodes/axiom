import { createContext, MouseEventHandler } from 'react';
import { Shape } from '@ui/components/button/types';
import { Size } from '@ui/shared/types/size';

type SegmentPickerContextType = {
  selectedValue: string | null;
  onSelect: (
    event: MouseEventHandler<HTMLButtonElement>,
    value: string,
  ) => void;
  size?: Size;
  shape?: Shape;
};

export const SegmentPickerContext =
  createContext<SegmentPickerContextType | null>(null);
