import React, { useReducer, useEffect } from 'react';
import TodoList from './todoList';
export const TodoContext = React.createContext();
const todoReduser = (state, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: Date.now(),
          text: '',
          completed: false
        }
      ];
    case 'remove':
      return state.filter(item => item.id !== action.payload);
    case 'complete':
      return state.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: !item.completed
          };
        }
        return item;
      });
    case 'initial':
      return action.payload;
    case 'update':
      return state.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            text: action.payload.text.current.value
          };
        }
        return item;
      });
    default:
      return state;
  }
};
export default () => {
  const [todoState, dispatch] = useReducer(todoReduser, []);
  const useEffectOnce = () => {
    useEffect(() => {
      const raw = localStorage.getItem('todoData');
      dispatch({ type: 'initial', payload: JSON.parse(raw) });
    }, []);
  };
  useEffectOnce();
  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoState));
  }, [todoState]);
  return (
    <TodoContext.Provider value={dispatch}>
      <section className="Todos_App container-fluid">
        <h1> Todos ({(todoState != null) ? todoState.length : 0})</h1>
        <button onClick={() => dispatch({ type: 'add' })}> Add New</button>
        <br />
        <br />
        <TodoList items={todoState} />
      </section>
    </TodoContext.Provider>
  );
};