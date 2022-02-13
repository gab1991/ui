import { useGithubProjectsContext } from 'modules/githubProjectsBoard/context';
import { SvgIcons } from 'shared/icons';
import { Button, Select } from 'shared/ui';

import styles from './SortableProjectList.module.scss';

import { ProjectList } from '..';

export function SortableProjectList() {
  const { addProject, availableSoringOptions, currentSorting, changeSorting } = useGithubProjectsContext();
  return (
    <>
      <div className={styles.controls}>
        <Button className={styles.addButton} onClick={addProject}>
          <SvgIcons.Plus className={styles.plusSvg} />
          ADD
        </Button>
        <Select
          className={styles.select}
          changedSelected={changeSorting}
          options={availableSoringOptions}
          selected={currentSorting}
        />
      </div>
      <ProjectList />
    </>
  );
}
