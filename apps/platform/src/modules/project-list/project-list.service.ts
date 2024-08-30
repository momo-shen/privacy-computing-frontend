import { message } from 'antd';

import { Model } from '@/util/valtio-helper';

export class ProjectListService extends Model {
  projectList = [];
  projectListLoading = false;

  getListProject = async () => {
  };

  getPipelines = async (projectId: string) => {
  };

  getJobs = async (projectId: string) => {
  };

  deleteProject = async (projectId: string) => {
  };

  updateProject = async (params: {
    projectId: string;
    name: string;
    description: string;
  }) => {

  }
}
