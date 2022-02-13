import { useState } from 'react';
import cn from 'classnames';

import { SvgIcons } from 'shared/icons';
import { Button, EmptyButton, TransparentInput } from 'shared/ui';

import styles from './ProjectTemplate.module.scss';

const MAX_STARS = 5;

export function ProjectTemplate() {
  const [selectedStar, setSelectedStar] = useState(0);
  const [hoveredStarindex, setHoveredStarIndex] = useState<null | number>(null);

  const starsBtnArray = Array.from({ length: MAX_STARS });

  return (
    <div className={styles.projectTemplate}>
      <form className={styles.form}>
        <TransparentInput placeholder='Project name' />
        <TransparentInput placeholder='Project link' />
        <ul className={styles.starList}>
          {starsBtnArray.map((_, index) => {
            const onStartBtnClick = () => setSelectedStar(index + 1);
            const onMouseEnter = () => setHoveredStarIndex(index);
            const onMouseLeave = () => setHoveredStarIndex(null);
            const isCovered = hoveredStarindex !== null && index < hoveredStarindex;

            return (
              <li key={index}>
                <EmptyButton
                  onClick={onStartBtnClick}
                  type='button'
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <SvgIcons.Star className={cn(styles.starSvg, { [styles.starSvg_covered]: isCovered })} />
                </EmptyButton>
              </li>
            );
          })}
        </ul>
        <Button className={styles.saveBtn}>SAVE</Button>
      </form>
    </div>
  );
}
