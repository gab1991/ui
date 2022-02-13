import { HTMLAttributes, useState } from 'react';
import cn from 'classnames';

import { Project } from 'types';

import { SvgIcons } from 'shared/icons';
import { EmptyButton } from 'shared/ui';
import { generateRandomColor } from 'shared/utils';

import styles from './ProjectCard.module.scss';

interface ProjectCardProps extends HTMLAttributes<HTMLDivElement> {
  onRemoveCardClick?: (id: string) => void;
  project: Project;
}

export function ProjectCard(props: ProjectCardProps) {
  const { project, className, onRemoveCardClick, ...htmlProps } = props;
  const [randomColor] = useState(generateRandomColor());

  const starsArray = Array.from({ length: project.rating });

  const onRemoveButtonClick = () => {
    onRemoveCardClick && onRemoveCardClick(project.id);
  };

  return (
    <div className={cn(styles.projectCard, className)} {...htmlProps}>
      <a
        href={project.url}
        rel='noopener noreferrer'
        target='_blank'
        className={styles.cardBody}
        style={{ backgroundColor: randomColor }}
      >
        <h4 className={styles.projectName}>{project.name}</h4>
        <ul className={styles.starList}>
          {starsArray.map((_, index) => (
            <li key={index}>
              <SvgIcons.Star className={styles.starSvg} />
            </li>
          ))}
        </ul>
      </a>
      <EmptyButton className={styles.removeButton} onClick={onRemoveButtonClick}>
        <SvgIcons.Cross className={styles.crosSvg} />
      </EmptyButton>
    </div>
  );
}
