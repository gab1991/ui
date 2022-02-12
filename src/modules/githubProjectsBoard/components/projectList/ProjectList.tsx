import { HTMLAttributes } from 'react';
import cn from 'classnames';

import { ProjectCard } from '../projectCard';
import { projects } from 'data/defaultProjects';

import styles from './ProjectList.module.scss';

type ProjectListProps = HTMLAttributes<HTMLUListElement>;

export function ProjectList(props: ProjectListProps) {
  const { className, ...htmlProps } = props;

  return (
    <ul className={cn(styles.projectList, className)} {...htmlProps}>
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
