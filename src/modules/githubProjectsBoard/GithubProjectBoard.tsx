import { HTMLAttributes } from 'react';
import cn from 'classnames';

import { ProjectList } from './components';

import styles from './GithubProjectBoard.module.scss';

type TGithubProjectBoardProps = HTMLAttributes<HTMLElement>;

export function GithubProjectBoard(props: TGithubProjectBoardProps) {
  const { className, ...htmlProps } = props;

  return (
    <section className={cn(styles.githubProjectBoard, className)} {...htmlProps}>
      <h1 className={styles.heading}>Github Projects</h1>
      <ProjectList />
    </section>
  );
}
