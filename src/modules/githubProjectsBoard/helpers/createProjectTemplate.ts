import { ProjectTemplate } from 'types';

let templateId = -1;

export function createProjectTemplate(): ProjectTemplate {
  templateId--;

  return {
    templateId,
  };
}
