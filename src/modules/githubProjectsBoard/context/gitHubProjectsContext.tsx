import React, { ReactNode, useContext, useLayoutEffect, useState } from 'react';

import { isAvailbaleSorgingOptions, ProjectSortingOptions } from '../types';
import { Project, ProjectTemplate } from 'types';

import { getProjectSoringCompareFn } from '../helpers';
import { createProjectTemplate, githubLocalStoreProjectsManager } from '../helpers/githubProjectHelpers';
import { projects as defaultProjects } from 'data/defaultProjects';

interface GitHubProjectsContext {
  addProject: () => void;
  availableSoringOptions: ProjectSortingOptions[];
  changeSorting: (newSorting: string) => void;
  currentSorting: ProjectSortingOptions;
  removeProject: (id: string) => void;
  removeTemplate: (id: number) => void;
  saveProject: (project: Project) => void;
  sortedProjects: Project[];
  templates: ProjectTemplate[];
}
const GitHubProjectContext = React.createContext<GitHubProjectsContext | null>(null);

interface GitHubProjectContextProviderProps {
  children: ReactNode;
}

export const availableSoringOptions: ProjectSortingOptions[] = [
  ProjectSortingOptions.creation_at_asc,
  ProjectSortingOptions.creation_at_desc,
  ProjectSortingOptions.name_asc,
  ProjectSortingOptions.name_desc,
];

export function GitHubProjectContextProvider(props: GitHubProjectContextProviderProps) {
  const [projects, setProjects] = useState<Project[]>(githubLocalStoreProjectsManager.getProjects() || defaultProjects);
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]);
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [currentSorting, setCurrentSoring] = useState(ProjectSortingOptions.name_asc);

  useLayoutEffect(() => {
    const compareFn = getProjectSoringCompareFn(currentSorting);
    const sorted = [...projects].sort(compareFn);
    setSortedProjects(sorted);
  }, [currentSorting, projects]);

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

  const changeSorting = (newSoting: string) => {
    isAvailbaleSorgingOptions(newSoting) && setCurrentSoring(newSoting);
  };

  return (
    <GitHubProjectContext.Provider
      value={{
        addProject,
        availableSoringOptions,
        changeSorting,
        currentSorting,
        removeProject,
        removeTemplate,
        saveProject,
        sortedProjects,
        templates,
      }}
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
