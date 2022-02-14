import { HTMLAttributes, useRef, useState } from 'react';
import cn from 'classnames';
import { useFormik } from 'formik';

import { Project } from 'types';

import { createNewProject } from 'modules/githubProjectsBoard/helpers/githubProjectHelpers';
import { useGrabFocus } from 'shared/hooks';
import { SvgIcons } from 'shared/icons';
import { Button, EmptyButton, TransparentInput } from 'shared/ui';
import { generateRandomColor } from 'shared/utils';
import { validateGithubLink } from 'shared/validation';

import styles from './ProjectTemplate.module.scss';

const MAX_STARS = 5;

interface ProjectTemplateProps extends HTMLAttributes<HTMLDivElement> {
  onProjectSave: (project: Project) => void;
  onTemplateRemove: (id: number) => void;
  templateId: number;
}

export function ProjectTemplate(props: ProjectTemplateProps) {
  const { onProjectSave, onTemplateRemove, templateId, ...htmlprops } = props;
  const [selectedStar, setSelectedStar] = useState(1);
  const [randomColor] = useState(generateRandomColor());
  const [hoveredStarindex, setHoveredStarIndex] = useState<null | number>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  useGrabFocus(nameInputRef);

  const formik = useFormik({
    initialValues: {
      link: '',
      name: '',
    },
    onSubmit: async ({ link, name }) => {
      const newProject = createNewProject(link, name, selectedStar);
      onProjectSave(newProject);
      onTemplateRemove(templateId);
    },
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

  const onRemoveClick = () => onTemplateRemove(templateId);

  return (
    <div className={styles.projectTemplate} style={{ backgroundColor: randomColor }} {...htmlprops}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TransparentInput
          placeholder='Project name'
          value={formik.values.name}
          onChange={formik.handleChange}
          name='name'
          refProp={nameInputRef}
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
      <EmptyButton className={styles.removeButton} onClick={onRemoveClick} aria-label='remove card'>
        <SvgIcons.Cross className={styles.crosSvg} />
      </EmptyButton>
    </div>
  );
}
