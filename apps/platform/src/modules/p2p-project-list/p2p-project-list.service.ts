import { parse } from 'query-string';

import API from '@/services';
import { Model } from '@/util/valtio-helper';

export class P2pProjectListService extends Model {
  projectList: API.PsiReqeust[] = [];
  psProjectList: API.PriSqlRequest[] = [];
  displayProjectList: API.PsiReqeust[] = [];
  displayPsProjectList: API.PriSqlRequest[] = [];
  projectListLoading = false;
  psProjectListLoading = false;

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
    this.displayProjectList = this.projectList;
    return this.projectList;
  };

  createProject = async (psiReqeust: API.PsiReqeust) => {
    await API.PsiController.createProject(psiReqeust);
    await this.getProjectList();
  }

  handleProject = async (id: string, action: string, receiverOutputPath: string) => {
    await API.PsiController.handleProject(id, action, receiverOutputPath);
    await this.getProjectList();
  };

  getPsProjectList = async () => {
    this.psProjectList = [
      {
        id: 1,
        projectName: '项目1'
      },
      {
        id: 2,
        projectName: '项目2'
      },
      {
        id: 3,
        projectName: '项目3'
      },
      {
        id: 4,
        projectName: '项目4'
      },
      {
        id: 5,
        projectName: '项目5'
      }
    ];
    this.displayPsProjectList = this.psProjectList;
    return this.psProjectList;
  }

  createPsProject = async (priSqlRequest: API.PriSqlRequest) => {
    this.displayPsProjectList.push(priSqlRequest);
  }
}
