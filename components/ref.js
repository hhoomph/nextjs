import React from 'react';
const textInput = React.createRef();
const inputSelection = () => {
  const input = textInput.current;
  if (input.value.length > 0) {
    input.select();
  }
};
export default props => {
  return (
    <div className="App_row p-2" style={{ width:'100%', marginTop: '-8px', background:'#4c2b3c' }}>
      <button style={{ fontWeight: 'bold' }} type="button" onClick={inputSelection} className="btn btn-info btn-sm">
        Select Input Text
      </button>
      <input style={{ fontWeight: 'bold', textAlign: 'center', borderRadius: '5px' }} type="text" ref={textInput} className="w-25" placeholder="type some text" />
    </div>
  );
};