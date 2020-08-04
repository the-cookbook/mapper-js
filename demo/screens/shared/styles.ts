import React from "react";

export default {
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: -15,
    marginLeft: -15,
  },
  col: {
    position: 'relative',
    width: '100%',
    padding: 15,
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: '100%',
  },
  title: {
    minWidth: '100%',
  },
  textField: {
    width: '100%',
    padding: 11,
    marginBottom:' 26px',
    border: 'none',
    borderRadius: '5px',
  },
  textArea: {
    backgroundColor: 'transparent',
    color: 'white',
    resize: 'none',
    display: 'flex',
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 20,
    border: 'none',
    boxSizing: 'border-box',
  },
  error: {
    width: '100%',
    fontStyle: 'italic',
    backgroundColor: '#fff',
    color: 'red',
    padding: 4,
  }
} as Record<string, React.CSSProperties>;
