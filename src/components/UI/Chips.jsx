import React from 'react';
import styles from './StandardLib/Styles/Chips.module.scss';

export const StandardChips = ({
  items = [],
  variant = 'default', // 'default' | 'minimal' | 'outlined'
  size = 'medium',    // 'small' | 'medium' | 'large'
  onChipClick,        // Optional click handler
  className = ''
}) => {
  return (
    <div className={`${styles.chipsContainer} ${className}`}>
      {items.map((item, index) => (
        <span
          key={item.id || index}
          className={`${styles.chip} ${styles[variant]} ${styles[size]}`}
          onClick={() => onChipClick?.(item)}
          data-active={item.active}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
};