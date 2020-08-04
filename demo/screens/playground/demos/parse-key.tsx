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
  const [dataSource, updateDataSource] = React.useState({ path: 'say.hello', value: 'world'});

  const handleOnPathChange = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>): void => {
    updateDataSource(prev => ({
      ...prev,
      path: value
    }));
  }
  const handleOnValueChange = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>): void => {
    updateDataSource(prev => ({
      ...prev,
      value: value
    }));
  }

  return (
    <div style={styles.row}>
      <div style={styles.col}>
        <div style={styles.row}>
          <p style={styles.title}>dot notation path</p>
          <input type="text" style={styles.textField} defaultValue={dataSource.path} onChange={handleOnPathChange} />
          <p style={styles.title}>value</p>
          <input type="text" style={styles.textField} defaultValue={dataSource.value} onChange={handleOnValueChange} />
        </div>

        <div style={styles.row}>
        </div>
      </div>
      <div style={styles.col}>
        <Formatter title="Output" source={dataSource.value && dataSource.path ? dot.parseKey(dataSource.path, dataSource.value) : {}} />
      </div>
    </div>
  );
};

export default Playground;
