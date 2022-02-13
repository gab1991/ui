import { HTMLAttributes } from 'react';
import cn from 'classnames';

import { ProjectCard, ProjectTemplate } from '../';
import { useGithubProjectsContext } from 'modules/githubProjectsBoard/context';

import styles from './ProjectList.module.scss';

type ProjectListProps = HTMLAttributes<HTMLUListElement>;

export function ProjectList(props: ProjectListProps) {
  const { className, ...htmlProps } = props;
  const { projects, templates, removeProject, saveProject, removeTemplate } = useGithubProjectsContext();

  return (
    <ul className={cn(styles.projectList, className)} {...htmlProps}>
      {templates.map((template) => (
        <li key={template.templateId}>
          <ProjectTemplate
            onProjectSave={saveProject}
            templateId={template.templateId}
            onTemplateRemove={removeTemplate}
          />
        </li>
      ))}
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} onRemoveCardClick={removeProject} />
        </li>
      ))}
    </ul>
  );
}
