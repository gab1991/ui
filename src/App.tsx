import { GithubProjectBoard } from 'modules';

import s from './App.module.scss';

export function App() {
  return (
    <main className={s.app}>
      <GithubProjectBoard className={s.section} />
    </main>
  );
}
