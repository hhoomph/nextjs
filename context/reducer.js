import React from "react";
import fetchData from "../utils/fetchData";
export const cartReduser = (state, action) => {
  switch (action.type) {
  case "refresh":
    return action.payload;
  case "add":
    return [...state, ...action.payload];
  default:
    return state;
  }
};
export const cartCountReduser = (state, action) => {
  switch (action.type) {
  case "refresh":
    return action.payload;
  case "add":
    return state + 1;
  case "remove":
    return state - 1;
  case "delete":
    return state - action.payload;
  default:
    return state;
  }
};
export const userProductsReducer = (state, action) => {
  switch (action.type) {
  case "refresh":
    return action.payload;
  case "add":
    return [...state, ...action.payload];
  case "remove":
    return state.filter(item => item.productId !== action.payload);
  case "active":
    return state.map(item => {
      if (item.productId === action.payload) {
        return {
          ...item,
          isDisable: !item.isDisable
        };
      }
      return item;
    });
  default:
    return state;
  }
};