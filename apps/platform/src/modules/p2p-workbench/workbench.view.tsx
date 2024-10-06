import classNames from 'classnames';
import { useState } from 'react';

import { P2pProjectListComponent } from '@/modules/p2p-project-list';

import styles from './index.less';

export const P2PWorkbenchComponent = () => {
  const [isUnfold, setIsUnfold] = useState(true);
  return (
    <div className={styles.main}>
      <div className={classNames(styles.mainContent, styles.header)}>
        <div className={classNames(styles.titleContent, styles.flexContent)}>
          <div className={styles.title}>
            税务隐私计算平台
          </div>
          <div
            className={styles.unfold}
            onClick={() => {
              setIsUnfold(!isUnfold);
            }}
          >
          </div>
        </div>
      </div>
      <div className={classNames(styles.mainContent, styles.project)}>
        <P2pProjectListComponent />
      </div>
    </div>
  );
};
