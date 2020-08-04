import React from 'react';
import ReactJson from 'react-json-view';
import is from "@cookbook/dot-notation/utils/is";

interface Formatter {
  title?: string;
  source: Record<string, unknown>;
}

const Formatter: React.FunctionComponent<Formatter> = (props: Formatter) => {
  const { title, source } = props;

  const shouldFormat = is.array(source) || is.object(source);

  return (
    <div style={{ marginBottom: 42 }}>
      {title && <p>{title}</p>}
      <div
        style={{
          background: '#fff',
          color: 'grey',
          padding: '12px',
          borderRadius: '4px',
        }}
      >
        {!shouldFormat && source}
        {shouldFormat && <ReactJson src={source} name={null} />}
      </div>
    </div>
  );
};

export type { Formatter };
export default Formatter;
