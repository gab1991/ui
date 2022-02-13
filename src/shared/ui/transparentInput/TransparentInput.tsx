import { InputHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './TransparentInput.module.scss';

interface TransparentInputProps extends InputHTMLAttributes<HTMLInputElement> {
  refProp?: React.LegacyRef<HTMLInputElement>;
}

export function TransparentInput(props: TransparentInputProps): JSX.Element {
  const { className, refProp, ...htmlProps } = props;

  return <input className={cn(styles.transparentInput, className)} ref={refProp} {...htmlProps} />;
}
