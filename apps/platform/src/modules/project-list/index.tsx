import { getModel, Model, useModel } from '@/util/valtio-helper';

import { ProjectListService } from './project-list.service';

export enum ComputeModeType {
  'ALL' = 'all',
  'MPC' = 'MPC',
  'TEE' = 'TEE',
}
export const computeModeText = {
  [ComputeModeType.MPC]: '管道',
  [ComputeModeType.TEE]: '枢纽',
};

export class ProjectListModel extends Model {
  pipelines = [];

  fetchingPipelineList = false;

  fetchingTaskList = false;

  jobs = [];

  readonly projectListService;

  constructor() {
    super();
    this.projectListService = getModel(ProjectListService);
  }

  async getPipelines(projectInfo) {
    this.fetchingPipelineList = true;
    const pipelines = await this.projectListService.getPipelines(
      projectInfo.projectId || '',
    );
    this.pipelines = pipelines;
    this.fetchingPipelineList = false;
  }

  async getJobs(projectInfo) {
    this.fetchingTaskList = true;
    const jobs = await this.projectListService.getJobs(projectInfo.projectId || '');
    this.jobs = jobs.data || [];
    this.fetchingTaskList = false;
  }
}
