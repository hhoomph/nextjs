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