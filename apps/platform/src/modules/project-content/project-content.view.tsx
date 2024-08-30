import React from 'react';

import { HomeLayoutService } from '@/modules/layout/home-layout/home-layout.service';
import { ProjectListComponent } from '@/modules/project-list';
import PlatformConfigs from '@/platform.config';
import { getModel, Model, useModel } from '@/util/valtio-helper';

import styles from './index.less';

export const ProjectContentComponent: React.FC = () => {
  const viewInstance = useModel(ProjectContentView);

  return (
    <div className={styles.content}>
      <div className={styles.contentHeader}>
        <div className={styles.contentHeaderleft}>
          {PlatformConfigs?.home?.HomePageTitle}
        </div>
      </div>
      <div className={styles.projectContent}>
        <div className={styles.projectContentLeft}>
          <ProjectListComponent />
        </div>
      </div>
    </div>
  );
};

export class ProjectContentView extends Model {
  pageTitle = PlatformConfigs.slogan || '科技护航数据安全  开源加速数据流通';

  homeLayoutService = getModel(HomeLayoutService);

  onViewMount() {
    this.homeLayoutService.setSubTitle(this.pageTitle);
  }
}
