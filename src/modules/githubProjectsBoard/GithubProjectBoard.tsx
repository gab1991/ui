import { HTMLAttributes } from 'react';
import cn from 'classnames';

import { GitHubProjectContextProvider } from 'modules/githubProjectsBoard/context';

import { SortableProjectList } from './components';

import styles from './GithubProjectBoard.module.scss';

type GithubProjectBoardProps = HTMLAttributes<HTMLElement>;

export function GithubProjectBoard(props: GithubProjectBoardProps) {
  const { className, ...htmlProps } = props;

  return (
    <section className={cn(styles.githubProjectBoard, className)} {...htmlProps}>
      <h1 className={styles.heading}>Github Projects</h1>
      <GitHubProjectContextProvider>
        <SortableProjectList />
      </GitHubProjectContextProvider>
    </section>
  );
}
