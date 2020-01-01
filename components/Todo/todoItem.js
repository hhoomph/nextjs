import React, { useContext, useRef, useEffect } from "react";
import { TodoContext } from "./Todos";
export default ({ id, text, completed }) => {
  //
  const dispatch = useContext(TodoContext);
  // create ref to pass text input value to reducer update function for update text after change
  let textRef = useRef();
  // Focus on text input just for once
  useEffect(() => textRef.current.focus(), []);
  return (
    <div className="p-1">
      <input className="mr-2 custom-control-input" id={id} type="checkbox" checked={completed} onChange={() => dispatch({ type: "complete", payload: id })} />
      <label className="custom-control-label" htmlFor={id} />
      <input className="mr-2" type="text" defaultValue={text} ref={textRef} onChange={() => dispatch({ type: "update", payload: { id: id, text: textRef } })} />
      <button className="mr-2" onClick={() => dispatch({ type: "remove", payload: id })}>
        Delete
      </button>
    </div>
  );
};