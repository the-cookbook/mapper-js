import React from 'react';
import dot from "@cookbook/dot-notation";

import Formatter from '../../../components/formatter';
import styles from '../../shared/styles';
import SourceCode from "../../shared/source-code";

const source = {
  parse: {
    'person.name.firstName': 'John',
    'person.name.lastName': 'Doe',
    'person.addresses[0].street': 'Infinite Loop',
    'person.addresses[0].city': 'Cupertino',
    'person.addresses[0].postalCode': 95014,
    'person.addresses[1].street': '1600 Amphitheatre',
    'person.addresses[1].city': 'Mountain View',
    'person.addresses[1].postalCode': 94043,
  },
};


const Playground: React.FunctionComponent<Record<string, unknown>> = () => {
  const [path, updatePath] = React.useState('');
  const [dataSource, updateDataSource] = React.useState(source.parse);

  const handleOnChange = (value: string): void => {
    updateDataSource(JSON.parse(value));
  }

  return (
    <div style={styles.row}>
      <div style={styles.col}>
        <div style={styles.row}>
          <p style={styles.title}>dot notation path</p>
          <SourceCode source={dataSource} onChange={handleOnChange} />
        </div>
      </div>
      <div style={styles.col}>
        <Formatter title="Output" source={dot.parse(dataSource)} />
      </div>
    </div>
  );
};

export default Playground;
