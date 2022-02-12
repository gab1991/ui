import { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './ProjectList.module.scss';
type TProjectListProps = HTMLAttributes<HTMLUListElement>;

export function ProjectList(props: TProjectListProps) {
  const { className, ...htmlProps } = props;

  return (
    <ul className={cn(styles.projectList, className)} {...htmlProps}>
      ProjectList
    </ul>
  );
}
