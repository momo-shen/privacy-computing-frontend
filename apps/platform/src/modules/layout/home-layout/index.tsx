import classnames from 'classnames';
import type { ReactNode } from 'react';

import { useModel } from '@/util/valtio-helper';

import { HeaderComponent } from './header-view';
import { HomeLayoutService } from './home-layout.service';
import styles from './index.less';

export const HomeLayout = ({ children }: { children: ReactNode }) => {
  const layoutService = useModel(HomeLayoutService);
  const { bgClassName } = layoutService;
  return (
    <div className={classnames(styles.home, styles[bgClassName])}>
      <div className={styles.header}>
        <HeaderComponent />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
