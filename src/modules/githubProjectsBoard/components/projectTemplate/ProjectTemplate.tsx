import { TransparentInput } from 'shared/ui';

import styles from './ProjectTemplate.module.scss';

export function ProjectTemplate() {
  return (
    <div className={styles.projectTemplate}>
      <form className={styles.form}>
        <TransparentInput placeholder='Project name' />
        <TransparentInput placeholder='Project link' />
      </form>
    </div>
  );
}
