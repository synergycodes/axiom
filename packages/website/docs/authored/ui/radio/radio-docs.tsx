import { Radio } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/radio.example.tsx';
import React from 'react';

export function RadioDocs() {
  const [selectedOption, setSelectedOption] = React.useState('option1');

  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '8px' }}>
          <Radio
            name="preview"
            value="option1"
            checked={selectedOption === 'option1'}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          <Radio
            name="preview"
            value="option2"
            checked={selectedOption === 'option2'}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
        </div>
      }
      cssPaths={['components/radio-button/radio.module.css']}
      componentPath="components/radio-button/radio.tsx"
      exampleCode={exampleCode}
    />
  );
}
