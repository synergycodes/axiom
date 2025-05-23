import { PropDescriptor } from 'react-docgen';
import { getAPIData } from '../get-api-data';
import { PropDescription } from './prop-description';
import styles from './props-list.module.css';

type Props = {
  path?: string;
  hardcodedProps?: PropMap;
};

export function PropsList({ path, hardcodedProps }: Props) {
  const { props } = getAPIData(path);
  const allProps = { ...props, ...hardcodedProps };
  const propsEntries = Object.entries(allProps);

  if (propsEntries.length === 0) {
    return null;
  }

  return (
    <div>
      <h1>Props</h1>
      <div className={styles['container']}>
        {propsEntries.map(([name, propDescriptor]) => (
          <PropDescription key={name} name={name} descriptor={propDescriptor} />
        ))}
      </div>
    </div>
  );
}

export type PropMap = Record<string, PropDescriptor>;
