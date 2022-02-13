import { HTMLAttributes } from 'react';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { ProjectCard, ProjectTemplate } from '../';
import { useGithubProjectsContext } from 'modules/githubProjectsBoard/context';

import styles from './ProjectList.module.scss';

type ProjectListProps = HTMLAttributes<HTMLUListElement>;

export function ProjectList(props: ProjectListProps) {
  const { className } = props;
  const { sortedProjects, templates, removeProject, saveProject, removeTemplate } = useGithubProjectsContext();

  return (
    <motion.ul layout className={cn(styles.projectList, className)}>
      {templates.map((template) => (
        <motion.li layout key={template.templateId}>
          <ProjectTemplate
            onProjectSave={saveProject}
            templateId={template.templateId}
            onTemplateRemove={removeTemplate}
          />
        </motion.li>
      ))}
      {sortedProjects.map((project) => (
        <AnimatePresence key={project.id}>
          <motion.li layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
            <ProjectCard project={project} onRemoveCardClick={removeProject} />
          </motion.li>
        </AnimatePresence>
      ))}
    </motion.ul>
  );
}
