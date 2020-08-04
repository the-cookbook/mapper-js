import React from 'react';
import styles from '../styles';

const validateJSON = (source: string): boolean => {
  try {
    JSON.parse(source);
  } catch (e) {
    return false;
  }

  return true;
}


interface SourceCode {
  source: string | Record<string, unknown>;
  onChange: (value: string) => void;
}

const SourceCode: React.FunctionComponent<SourceCode> = (props: SourceCode) => {
  const { source, onChange } = props;
  const [isJSONValid, updateJSONValidation] = React.useState<boolean>(true);

  const handleOnChange = ({ target: { value }}: React.ChangeEvent<HTMLTextAreaElement>) => {
    let isValid = validateJSON(value);

    updateJSONValidation(isValid);

    if (isValid) {
      onChange(JSON.parse(value))
    }
  }


  return (
    <React.Fragment>
      {!isJSONValid && (
        <p style={styles.error}>Invalid JSON format</p>
      )}
      <div
        style={{
          ...styles.col,
          ...{
            border: 'solid 1px #fff',
            borderRadius: '4px',
            padding: 0,
          },
        }}>
        <textarea style={styles.textArea} rows={30} onChange={handleOnChange} >{JSON.stringify(source, null, ' ')}</textarea>
      </div>
    </React.Fragment>
  )
};

export default SourceCode;
