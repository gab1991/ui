import { useState } from 'react';
import cn from 'classnames';
import { useFormik } from 'formik';

import { SvgIcons } from 'shared/icons';
import { Button, EmptyButton, TransparentInput } from 'shared/ui';
import { validateGithubLink } from 'shared/validation';

import styles from './ProjectTemplate.module.scss';

const MAX_STARS = 5;

export function ProjectTemplate() {
  const [selectedStar, setSelectedStar] = useState(0);
  const [hoveredStarindex, setHoveredStarIndex] = useState<null | number>(null);

  const formik = useFormik({
    initialValues: {
      link: '',
      name: '',
    },
    onSubmit: async ({ link, name }) => {},
    validate: ({ link }) => {
      const isValid = validateGithubLink(link);

      if (isValid) {
        return;
      }

      alert('Has to be github project link');
      return {
        link: '',
      };
    },
    validateOnChange: false,
  });

  const starsBtnArray = Array.from({ length: MAX_STARS });

  return (
    <div className={styles.projectTemplate}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TransparentInput
          placeholder='Project name'
          value={formik.values.name}
          onChange={formik.handleChange}
          name='name'
        />
        <TransparentInput
          placeholder='Project link'
          value={formik.values.link}
          onChange={formik.handleChange}
          name='link'
        />
        <ul className={styles.starList}>
          {starsBtnArray.map((_, index) => {
            const onStartBtnClick = () => setSelectedStar(index + 1);
            const onMouseEnter = () => setHoveredStarIndex(index);
            const onMouseLeave = () => setHoveredStarIndex(null);
            const isCovered = hoveredStarindex !== null && index < hoveredStarindex;
            const isSelected = selectedStar >= index + 1;

            return (
              <li key={index}>
                <EmptyButton
                  onClick={onStartBtnClick}
                  type='button'
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <SvgIcons.Star
                    className={cn(styles.starSvg, {
                      [styles.starSvg_covered]: isCovered,
                      [styles.starSvg_selected]: isSelected,
                    })}
                  />
                </EmptyButton>
              </li>
            );
          })}
        </ul>
        <Button className={styles.saveBtn} type='submit'>
          SAVE
        </Button>
      </form>
    </div>
  );
}
