import React from 'react';
import TodoItem from './TodoItem';
export default ({ items }) => {
  if (items != null && items.length >= 1) {
    return items.map(item => <TodoItem key={item.id} {...item} />);
  } else {
    return (
      <div>
        <span role="img" aria-label="done">
          📗
        </span>
        CONGRATULATION
        <span role="img" aria-label="ok">
          🍸🎁
        </span>
        YOU HAVE DONE ALL THE TASKS.
        <span role="img" aria-label="ok">
          👌 👍
        </span>
      </div>
    );
  }
};