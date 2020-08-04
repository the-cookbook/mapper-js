import React from 'react';

import Menu from '../shared/menu';

import Pick from './demos/pick';
import Parse from './demos/parse';
import ParseKey from './demos/parse-key';

const selectView = (state: string, action: string ): React.ReactNode => {
  switch (action) {
    case 'parse':
      return Parse;

    case 'parse-key':
      return ParseKey;

    case 'pick':
    default:
      return Pick;
  }
}

const Playground: React.FunctionComponent<Record<string, unknown>> = () => {
  const [View, dispatch] = React.useReducer(selectView, Pick);

  const handleOnClick = (value: string): void => {
    dispatch(value);
  }

  return (
    <React.Fragment>
      <Menu onClick={handleOnClick} />
      <div
        style={{
          background: '#3F51B5',
          background: 'linear-gradient(225deg, #3F51B5 0%, rgb(233, 30, 99) 100%)',
          color: '#fff',
          height: '100%',
          padding: 22,
        }}
        className="bg-pan-left"
      >
        <h2>Playground</h2>
        <View />
      </div>
    </React.Fragment>
  );
};

export default Playground;
