import { ArrowClockwise } from '@phosphor-icons/react';
import { NavButton, Tooltip } from '@synergycodes/axiom';

type Props = {
  onReset: () => void;
} & Partial<React.ComponentProps<typeof NavButton>>;

export function ResetButton({ onReset, ...props }: Props) {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <NavButton {...props} onClick={onReset} icon={<ArrowClockwise />} />
      </Tooltip.Trigger>
      <Tooltip.Content>Reset</Tooltip.Content>
    </Tooltip>
  );
}
