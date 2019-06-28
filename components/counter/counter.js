import React from 'react';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
const Counter = props => {
  //const initCountVal = parseInt(props.counter.value) >= 0 ? parseInt(props.counter.value) : 0;
  //const [count, setCount] = useState(parseInt(props.counter.value) >= 0 ? parseInt(props.counter.value) : 0);
  const { counter, onDecrement, onIncrement, onDelete } = props;
  const formatCount = () => (counter.value <= 0 ? 'Zero' : counter.value);
  const badgeClasse = () => {
    let classes = 'badge Badge_Counter mr-2 badge-';
    classes += counter.value === 0 ? 'danger' : 'primary pr-4 pl-4';
    return classes;
  };
  //   const handleIncrement = arg => {
  //     //console.log(arg);
  //     setCount(count + 1);
  //   };
  //   const handleDecrement = () => {
  //     if (count <= 0) {
  //       setCount(0);
  //     } else {
  //       setCount(count + -1);
  //     }
  //   };
  return (
    <div className="App_row pt-1">
      <h4 className="mr-1">{counter.id}. </h4>
      <span className={badgeClasse()}> Count : {formatCount()} </span>
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="tooltip-right">
            {' '}
            <strong> کاهش</strong>{' '}
          </Tooltip>
        }
      >
        <Button onClick={() => onDecrement(counter)} disabled="" size="sm" className="btn btn-warning ml-2" title="decrement">
          {' '}
          -{' '}
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id="tooltip-top">
            <strong>افزایش</strong>
          </Tooltip>
        }
      >
        <Button onClick={() => onIncrement(counter)} size="sm" className="btn btn-success ml-2" title="increment" data-toggle="tooltip">
          +
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="right"
        overlay={
          <Tooltip id="tooltip-right">
            <strong>حذف</strong>
          </Tooltip>
        }
      >
        <Button onClick={() => onDelete(counter.id)} size="sm" className="btn btn-danger ml-2" title="Delete" data-toggle="tooltip">
          X
        </Button>
      </OverlayTrigger>
      <div className="d-none">Hidden Div with d-none bootstrap class</div>
    </div>
  );
};
export default Counter;