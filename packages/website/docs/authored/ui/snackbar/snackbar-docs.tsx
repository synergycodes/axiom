import { useState } from 'react';
import { LabelButton, Snackbar } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/snackbar.example.tsx';

export function SnackbarDocs() {
  const [showSnackbar, setShowSnackbar] = useState(false);

  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!showSnackbar && (
            <LabelButton
              onClick={() => setShowSnackbar(true)}
              label="Show Snackbar"
              style={{ width: 'max-content' }}
            />
          )}
          {showSnackbar && (
            <Snackbar
              variant="success"
              title="Operation completed successfully"
              subtitle="Your changes have been saved"
              close={true}
              buttonLabel="Undo"
              onClose={() => setShowSnackbar(false)}
              onButtonClick={() => alert('Button clicked')}
            />
          )}
        </div>
      }
      cssPaths={['components/snackbar/snackbar.module.css']}
      componentPath="components/snackbar/snackbar.tsx"
      exampleCode={exampleCode}
    />
  );
}
