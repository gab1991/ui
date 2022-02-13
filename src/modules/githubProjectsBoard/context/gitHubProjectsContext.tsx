import React, { ReactNode, useContext, useState } from 'react';

import { Project, ProjectTemplate } from 'types';

import { createProjectTemplate, githubLocalStoreProjectsManager } from '../helpers/githubProjectHelpers';
import { projects as defaultProjects } from 'data/defaultProjects';

interface GitHubProjectsContext {
  addProject: () => void;
  projects: Project[];
  removeProject: (id: string) => void;
  removeTemplate: (id: number) => void;
  saveProject: (project: Project) => void;
  templates: ProjectTemplate[];
}
const GitHubProjectContext = React.createContext<GitHubProjectsContext | null>(null);

interface GitHubProjectContextProviderProps {
  children: ReactNode;
}

export function GitHubProjectContextProvider(props: GitHubProjectContextProviderProps) {
  const [projects, setProjects] = useState<Project[]>(githubLocalStoreProjectsManager.getProjects() || defaultProjects);
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);

  const removeProject = (id: string) => {
    const newProjects = projects.filter((project) => project.id !== id);
    githubLocalStoreProjectsManager.saveProjects(newProjects);

    setProjects(newProjects);
  };

  const addProject = () => {
    const newProjectTemplate = createProjectTemplate();

    setTemplates((prev) => [newProjectTemplate, ...prev]);
  };

  const saveProject = (project: Project) => {
    const allProjects = [project, ...projects];

    setProjects(allProjects);
    githubLocalStoreProjectsManager.saveProjects(allProjects);
  };

  const removeTemplate = (id: number) => {
    const filteredTemplates = templates.filter((template) => template.templateId !== id);

    setTemplates(filteredTemplates);
  };

  return (
    <GitHubProjectContext.Provider
      value={{ addProject, projects, removeProject, removeTemplate, saveProject, templates }}
    >
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
