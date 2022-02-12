import { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './GithubProjectBoard.module.scss';

type TGithubProjectBoardProps = HTMLAttributes<HTMLElement>;

export function GithubProjectBoard(props: TGithubProjectBoardProps) {
  const { className, ...htmlProps } = props;

  return (
    <section className={cn(styles.githubProjectBoard, className)} {...htmlProps}>
      GithubProjectBoard
    </section>
  );
}
