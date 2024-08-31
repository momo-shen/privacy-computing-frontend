import { parse } from 'query-string';

import API from '@/services';
import { Model } from '@/util/valtio-helper';

export class P2pProjectListService extends Model {
  projectList: API.PsiReqeust[] = [];
  displayProjectList: API.PsiReqeust[] = [];
  projectListLoading = false;

  nodeId: string | undefined = undefined;

  onViewMount() {
    const { nodeId } = parse(window.location.search);
    if (nodeId) {
      this.nodeId = nodeId as string;
    }
  }

  getProjectList = async () => {
    this.projectListLoading = true;
    const ownerId: string = localStorage.getItem('ownerId') || '';
    const response = await API.PsiController.getProjectList(ownerId);
    const data = response.requests;
    this.projectList = data || [];
    this.projectListLoading = false;
    this.displayProjectList = this.projectList.reverse();
    return this.projectList.reverse();
  };

  createProject = async (psiReqeust: API.PsiReqeust) => {
    await API.PsiController.createProject(psiReqeust);
    await this.getProjectList();
  }

  handleProject = async (id: number, action: string) => {
    await API.PsiController.handleProject(id, action);
    await this.getProjectList();
  };
}
