import { parse } from 'query-string';

import API from '@/services';
import { Model } from '@/util/valtio-helper';

import type { StatusEnum } from './components/auth-project-tag';

export class P2pProjectListService extends Model {
  projectList = [];
  displayProjectList = [];
  projectListLoading = false;

  messageGetList: null | (() => Promise<void>) = null;

  comment = '';

  nodeId: string | undefined = undefined;

  onViewMount() {
    const { nodeId } = parse(window.location.search);
    if (nodeId) {
      this.nodeId = nodeId as string;
    }
  }

  setComment = (value: string) => {
    this.comment = value;
  };

  getListProject = async () => {
    this.projectListLoading = true;
    const response = await API.PsiController.getListProject();
    const data = response.requests;
    this.projectList = data || [];
    this.projectListLoading = false;
    this.displayProjectList = this.projectList.reverse();
    return this.projectList.reverse();
  };
  /**
   * 编辑项目
   */
  projectEdit = async (item: API.ProjectVO, projectId: string) => {

  };

  /**
   * 处理审批
   * @param action c
   * @param id
   */
  process = async (action: StatusEnum, id: string, pathname: string) => {

  };
}
