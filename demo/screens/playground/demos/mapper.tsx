import React from 'react';
import data from '@cookbook/mapper-js/__mocks__/data'

import Formatter from '../../../components/formatter';
import styles from '../../shared/styles';

import mapping from './mapping';

const Playground: React.FunctionComponent<Record<string, unknown>> = () => {

  return (
    <div style={styles.row}>
      <div style={styles.col}>
        <div style={styles.row}>
          <Formatter title="Data source" source={data} />
        </div>
      </div>
      <div style={styles.col}>
        <Formatter title="Output" source={mapping(data)} />
      </div>
    </div>
  );
};

export default Playground;
