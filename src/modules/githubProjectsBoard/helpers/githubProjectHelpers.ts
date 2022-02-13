import { v4 as generateUUID } from 'uuid';

import { Project, ProjectTemplate } from 'types';

import { LocalStorageHandler } from 'shared/utils/LocalStorageHandler';

let templateId = -1;

export function createProjectTemplate(): ProjectTemplate {
  templateId--;

  return {
    templateId,
  };
}

export function createNewProject(link: string, name: string, rating: number): Project {
  return {
    created_at: new Date().toISOString(),
    id: generateUUID(),
    name,
    rating,
    url: link,
  };
}

class GithubLocalStoreProjectsManager {
  private readonly key: string;

  constructor() {
    this.key = 'githubProjects';
  }

  public saveProjects(projects: Project[]) {
    const stringifiedProjects = JSON.stringify(projects);
    LocalStorageHandler.setItem(this.key, stringifiedProjects);
  }

  public getProjects() {
    const foundProjects = LocalStorageHandler.getItem(this.key);

    if (!foundProjects) {
      return null;
    }

    return JSON.parse(foundProjects);
  }
}
export const githubLocalStoreProjectsManager = new GithubLocalStoreProjectsManager();
