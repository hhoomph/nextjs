import React, { useState, memo, lazy } from 'react';
import Counter from './counter';
const valueInput = React.createRef();
const idInput = React.createRef();
//export default () => {
const Counters = () => {
  const [counters, setCounters] = useState([
    {
      id: 1,
      value: 0
    },
    {
      id: 2,
      value: 0
    },
    {
      id: 3,
      value: 0
    }
  ]);
  const handleDelete = id => {
    let removedCounters = counters.filter(c => c.id !== id);
    setCounters(removedCounters);
  };
  const handleAdd = () => {
    let value = parseInt(valueInput.current.value);
    let id = 1;
    if (counters.length > 0) {
      id = counters[counters.length - 1]['id'] + 1;
    }
    if (value >= 0) {
      const addedCounters = [...counters, { id: id, value: value }];
      setCounters(addedCounters);
      valueInput.current.value = '';
      idInput.current.value = ++id;
    } else if (isNaN(value)) {
      alert('Please insert Count number value. Value Type Must be Number!!');
    }
  };
  const handleIncrement = counter => {
    const c = [...counters];
    const index = c.indexOf(counter);
    c[index] = { ...counter };
    c[index].value++;
    setCounters(c);
  };
  const handleDecrement = counter => {
    const c = [...counters];
    const index = c.indexOf(counter);
    c[index] = { ...counter };
    if (c[index].value <= 0) {
      c[index].value = 0;
    } else {
      c[index].value--;
    }
    setCounters(c);
  };
  const handleReset = () => {
    const cs = [...counters];
    const resetedCounters = cs.map(c => {
      c.value = 0;
      return c;
    });
    //console.log(resetedCounters);
    setCounters(prevCounts => {
      return resetedCounters;
    });
  };
  return (
    <section className="Counter_App container-fluid">
      <button onClick={handleReset} className="btn btn-sm btn-secondary m-2">
        Reset Values
      </button>
      {counters.map(counter => (
        <Counter key={counter.id} counter={counter} onDelete={handleDelete} onIncrement={handleIncrement} onDecrement={handleDecrement} />
      ))}
      <div className="pt-2 mb-2">
        <h4 style={{ justifyContent: 'center', width: '100%', color: '#ba68c8' }}>Add New Row :</h4>
        <div>
          <input ref={valueInput} style={{ fontWeight: 'bold', textAlign: 'center', borderRadius: '5px', width: '10%', color: '#b42bcc' }} type="text" placeholder="Value" className="add_input" />
          <input ref={idInput} style={{ fontWeight: 'bold', textAlign: 'center', borderRadius: '5px', width: '7%', color: '#b42bcc' }} type="text" placeholder="ID" className="add_input" />
          <button onClick={handleAdd} style={{ fontWeight: 'bold' }} type="button" className="btn btn-success btn-sm ml-2">
            Add
          </button>
        </div>
      </div>
    </section>
  );
};
export default memo(Counters);