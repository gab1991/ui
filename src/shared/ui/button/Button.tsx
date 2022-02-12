import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  const { className, ...htmlProps } = props;

  return <button className={cn(styles.button, className)} {...htmlProps} />;
}
