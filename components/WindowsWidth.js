import React, { useState, useEffect } from 'react';
export default () => {
  const [width, setWidth] = useState(undefined);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    setWidth(window.innerWidth);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return width;
}