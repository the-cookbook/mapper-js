import React from 'react';
import dot from "@cookbook/dot-notation";

import Formatter from '../../../components/formatter';
import SourceCode from "../../shared/source-code";
import styles from '../../shared/styles';

const source = {
  pick: {
    person: {
      name: {
        firstName: 'John',
        lastName: 'Doe',
      },
      address: [
        {
          street: 'Infinite Loop',
          city: 'Cupertino',
          state: 'CA',
          postalCode: 95014,
          country: 'United States',
        },
        {
          street: '1600 Amphitheatre',
          city: 'Mountain View',
          state: 'CA',
          postalCode: 94043,
          country: 'United States',
        },
      ],
      nested: [
        [
          {
            foo: 'bar',
          },
          'secret',
        ],
      ],
    },
    array: [
      [[['foo']]],
      [
        {
          hello: 'world',
        },
        true,
        1000,
      ],
    ],
  }
};

const Playground: React.FunctionComponent<Record<string, unknown>> = () => {
  const [path, updatePath] = React.useState('person.name');
  const [dataSource, updateDataSource] = React.useState(source.pick);

  const handleOnChange = (value: string): void => {
    updateDataSource(JSON.parse(value));
  }

  return (
    <div style={styles.row}>
      <div style={styles.col}>
        <div style={styles.row}>
          <p style={styles.title}>dot notation path</p>
          <input type="text" style={styles.textField} defaultValue={path} onChange={({ target: { value }}) => updatePath(value)} />
        </div>
        <div style={styles.row}>
          <SourceCode source={dataSource} onChange={handleOnChange} />
        </div>
      </div>
      <div style={styles.col}>
        <Formatter title="Output" source={path ? dot.pick(dataSource, path) : {}} />
      </div>
    </div>
  );
};

export default Playground;
