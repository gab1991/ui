export enum ProjectSortingOptions {
  'creation_at_asc' = 'Created At Asc',
  'creation_at_desc' = 'Created At Desc',
  'name_asc' = 'Name Asc',
  'name_desc' = 'Name Desc',
}

export const isAvailbaleSorgingOptions = (value: string): value is ProjectSortingOptions => {
  return Object.values(ProjectSortingOptions).includes(value as ProjectSortingOptions);
};
