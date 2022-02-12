import { useGithubProjectsContext } from 'modules/githubProjectsBoard/context';
import { SvgIcons } from 'shared/icons';
import { Button } from 'shared/ui';

import styles from './SortableProjectList.module.scss';

import { ProjectList } from '..';

export function SortableProjectList() {
  const { addProject } = useGithubProjectsContext();

  return (
    <>
      <div className={styles.controls}>
        <Button className={styles.addButton} onClick={addProject}>
          <SvgIcons.Plus className={styles.plusSvg} />
          ADD
        </Button>
      </div>
      <ProjectList />
    </>
  );
}
