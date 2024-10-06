import { parse } from 'query-string';

import API from '@/services';
import { Model } from '@/util/valtio-helper';

export class P2pProjectListService extends Model {
  projectList: API.PsiProject[] = [];
  psProjectList: API.PriSqlProject[] = [];
  displayProjectList: API.PsiProject[] = [];
  displayPsProjectList: API.PriSqlProject[] = [];
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
    const userId: string = localStorage.getItem('userId') || '';
    const response = await API.PsiController.getProjectList(userId);
    const data = response.data;
    this.projectList = data || [];
    this.projectListLoading = false;
    this.displayProjectList = this.projectList;
    return this.projectList;
  };

  createProject = async (psiProject: API.PsiProject) => {
    await API.PsiController.createProject(psiProject);
    await this.getProjectList();
  }

  handleProject = async (id: string, action: string, receiverOutputPath: string) => {
    await API.PsiController.handleProject(id, action, receiverOutputPath);
    await this.getProjectList();
  };

  getPsProjectList = async () => {
    this.psProjectList = [
      {
        id: '1',
        projectName: '项目1',
        owner: 'alice',
        members: []
      },
      {
        id: '2',
        projectName: '项目2',
        owner: 'alice',
        members: []
      },
      {
        id: '3',
        projectName: '项目3',
        owner: 'alice',
        members: []
      },
      {
        id: '4',
        projectName: '项目4',
        owner: 'bob',
        members: []
      },
      {
        id: '5',
        projectName: '项目5',
        owner: 'bob',
        members: ['alice']
      }
    ];
    this.displayPsProjectList = this.psProjectList;
    return this.psProjectList;
  }

  createPsProject = async (priSqlProject: API.PriSqlProject) => {
    this.displayPsProjectList.push(priSqlProject);
  }
}
