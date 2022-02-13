import { HTMLAttributes, SyntheticEvent, useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './Select.module.scss';

interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  changedSelected: (option: string) => void;
  options: Array<string>;
  selected: string;
}

export function Select(props: SelectProps) {
  const { selected, options, changedSelected, className, ...htmlProps } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selected);

  const clickHandler = () => setShowDropdown(!showDropdown);

  const changeHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLButtonElement) {
      setSelectedValue(e.target.textContent || '');
      changedSelected(e.target.textContent || '');
    }
  };

  const leaveHandler = () => setShowDropdown(false);

  useEffect(() => {
    if (selectedValue !== selected) setSelectedValue(selected);
  }, [selected, selectedValue]);

  return (
    <div className={cn(styles.selectBox, className)} onMouseLeave={leaveHandler} {...htmlProps}>
      <button
        className={cn(styles.textSection, styles.textSection_first, { [styles.textSection_first_open]: showDropdown })}
        onClick={clickHandler}
      >
        <span>{selectedValue}</span>
      </button>
      {showDropdown && (
        <ul className={styles.options}>
          {options.map((option, ind) => {
            const isLast = ind === options.length - 1;
            if (option !== selectedValue) {
              return (
                <li key={option}>
                  <button
                    className={cn(styles.textSection, { [styles.textSection_last]: isLast })}
                    onClick={changeHandler}
                  >
                    {option}
                  </button>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      )}
    </div>
  );
}
