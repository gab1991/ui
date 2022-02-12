import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './EmptyButton.module.scss';

export function EmptyButton(props: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  const { className, ...htmlProps } = props;

  return <button className={cn(styles.emptyBtn, className)} {...htmlProps} />;
}
