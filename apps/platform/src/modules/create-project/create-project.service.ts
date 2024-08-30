import { message } from 'antd';
import { history } from 'umi';

import { LoginService } from '@/modules/login/login.service';
import { Model, getModel } from '@/util/valtio-helper';

import { ComputeModeType } from '../p2p-project-list/components/common';

export class CreateProjectService extends Model {
  loginService = getModel(LoginService);

  project: string[] = [];

  nodeList = [];

  dataTable = {};

  teeNodeList = [];

  edgeNodeList = [];

  constructor() {
    super();
    // this.commands = getModel(CommandRegistry);
    this.getTeeNodeList();
  }

  async getNodeList() {

  }

  async getEdgeNodeList(nodeId: string) {

  }

  getDatatableInfo = async (nodeId: string, datatableId: string) => {

  };

  async addInstToProject(projectId: string) {

  }

  async addNodeToProject(projectId: string, nodeList: string[]) {

  }

  async addTablesToProject(projectId: string) {

  }

  createProject = async (
    value: {
      projectName: string;
      description: string;
      computeMode: string;
      nodes: string[];
    },
    notGuidePage = false,
  ) => {
  };

  getTeeNodeList = async () => {

  };
}
