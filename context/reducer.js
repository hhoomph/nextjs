import React from 'react';
import fetchData from '../utils/fetchData';
export const cartReduser = (state, action) => {
  switch (action.type) {
    case 'refresh':
      return action.payload;
    default:
      return state;
  }
};
export const cartCountReduser = (state, action) => {
  switch (action.type) {
    case 'refresh':
      return action.payload;
    case 'add':
      return state + 1;
    case 'remove':
      return state - 1;
    case 'delete':
      return state - action.payload;
    default:
      return state;
  }
};