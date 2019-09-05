import React, { useContext, useRef, useState, useEffect, memo } from 'react';
import '../../scss/components/button.scss';
const SubmitButton = props => {
  return (
    <button onClick={props.onClick} className={props.className} type="button">{props.text}</button>
  );
};
export default memo(SubmitButton);