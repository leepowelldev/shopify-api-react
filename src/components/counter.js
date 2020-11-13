import React, { useCallback } from 'react';
import styles from './counter.module.css';

const Counter = ({ value = 0, min, max, onChange = () => {} }) => {
  const handleDecrement = useCallback(() => {
    const next = value - 1;
    if (min === undefined || next >= min) {
      onChange(next);
    }
  }, [value, min, onChange]);

  const handleIncrement = useCallback(() => {
    const next = value + 1;
    if (max === undefined || next <= max) {
      onChange(next);
    }
  }, [value, max, onChange]);

  return (
    <div className={styles.container}>
      <button type="button" aria-label="Decrement" onClick={handleDecrement}>
        -
      </button>
      <div>
        <input type="text" value={value} readOnly className={styles.input} />
      </div>
      <button type="button" aria-label="Increment" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default Counter;
