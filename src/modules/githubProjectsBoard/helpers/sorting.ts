import { ProjectSortingOptions } from '../types';
import { Project } from 'types';

type CompareFn = (a: Project, b: Project) => number;

const compareFnMap: Record<ProjectSortingOptions, CompareFn> = {
  [ProjectSortingOptions.rating_asc]: (a, b) => (a.rating < b.rating ? -1 : 1),
  [ProjectSortingOptions.rating_desc]: (a, b) => (a.rating > b.rating ? -1 : 1),
  [ProjectSortingOptions.creation_at_asc]: (a, b) => (new Date(a.created_at) < new Date(b.created_at) ? -1 : 1),
  [ProjectSortingOptions.creation_at_desc]: (a, b) => (new Date(a.created_at) > new Date(b.created_at) ? -1 : 1),
} as const;

export function getProjectSoringCompareFn(sortOrder: ProjectSortingOptions): CompareFn {
  return compareFnMap[sortOrder];
}

export function sortProjects(projects: Project[], sortOption: ProjectSortingOptions): Project[] {
  const compareFn = getProjectSoringCompareFn(sortOption);
  return [...projects].sort(compareFn);
}
