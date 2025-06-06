import { Tooltip } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/tooltip.example.tsx';

export function TooltipDocs() {
  return (
    <ComponentPage
      preview={
        <Tooltip>
          <Tooltip.Trigger>
            <span>Tooltip</span>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <span>Tooltip</span>
          </Tooltip.Content>
        </Tooltip>
      }
      cssPaths={['components/tooltip/tooltip.module.css']}
      componentPath="components/tooltip/tooltip.tsx"
      exampleCode={exampleCode}
    />
  );
}
