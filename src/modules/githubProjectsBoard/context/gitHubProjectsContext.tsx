import React, { ReactNode, useContext, useState } from 'react';

import { Project, ProjectTemplate } from 'types';

import { createProjectTemplate } from '../helpers/createProjectTemplate';
import { projects as defaultProjects } from 'data/defaultProjects';

interface GitHubProjectsContext {
  addProject: () => void;
  projects: Project[];
  removeProject: (id: string) => void;
  templates: ProjectTemplate[];
}
const GitHubProjectContext = React.createContext<GitHubProjectsContext | null>(null);

interface GitHubProjectContextProviderProps {
  children: ReactNode;
}

export function GitHubProjectContextProvider(props: GitHubProjectContextProviderProps) {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);

  const removeProject = (id: string) => {
    const newProjects = projects.filter((project) => project.id !== id);

    setProjects(newProjects);
  };

  const addProject = () => {
    const newProjectTemplate = createProjectTemplate();

    setTemplates((prev) => [newProjectTemplate, ...prev]);
  };

  return (
    <GitHubProjectContext.Provider value={{ addProject, projects, removeProject, templates }}>
      {props.children}
    </GitHubProjectContext.Provider>
  );
}

export function useGithubProjectsContext(): GitHubProjectsContext {
  const context = useContext(GitHubProjectContext);

  if (!context) {
    throw new Error('useGithubProjectsContext should be use within GitHubProjectContext.Provider');
  }
  return context;
}
