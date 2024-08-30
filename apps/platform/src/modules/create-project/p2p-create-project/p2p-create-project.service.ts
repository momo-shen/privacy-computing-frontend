import { message } from 'antd';
import { parse } from 'query-string';

import { Model } from '@/util/valtio-helper';

/**
 * P2P模式
 */
export class P2PCreateProjectService extends Model {
  /**
   * 创建项目loading
   */
  loading = false;

  /**
   * 和本方节点已建立好授权的节点列表
   */
  nodeList = [];

  /**
   * 本方节点下的数据表
   */
  nodeDataSheet: { label: string; id: string }[] = [];

  /**
   * 获取已建立好授权的节点列表
   * @param nodeId
   */
  getNodeList = async (nodeId: string) => {

  };

  /**
   * 获取当前节点的数据
   */
  getNodeData = async (nodeId: string) => {

  };

  /**
   * P2P创建项目,发起审批
   */
  createProject = async (value: {
    projectName: string;
    description: string;
    computeFunc: string;
    computeMode: string;
    nodes: string[];
    dataSheet?: string[];
  }) => {
  };
}
