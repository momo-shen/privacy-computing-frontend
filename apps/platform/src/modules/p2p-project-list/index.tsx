import {SearchOutlined} from '@ant-design/icons';
import {Empty, Table, Tag} from 'antd';
import { Button, Typography, Tooltip, Input, Space } from 'antd';
import { Spin } from 'antd';
import classNames from 'classnames';
import { parse } from 'query-string';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import React from 'react';
import { history, useLocation } from 'umi';

import { EdgeRouteWrapper, isP2PWorkbench } from '@/components/platform-wrapper';
import { P2PCreateProjectModal } from '@/modules/create-project/p2p-create-project/p2p-create-project.view';
import { EditProjectModal } from '@/modules/project-list/components/edit-project';
import { getModel, Model, useModel } from '@/util/valtio-helper';

import {
  SelectProjectState,
} from '../p2p-project-list/components/common';
import {
  ComputeModeType,
  RadioGroup,
  RadioGroupState,
} from '../p2p-project-list/components/common';

import styles from './index.less';
import { P2pProjectListService } from './p2p-project-list.service';
import type {FilterValue} from "antd/es/table/interface";

export const P2pProjectListComponent: React.FC = () => {
  const projectListModel = useModel(ProjectListModel);
  const p2pProjectService = useModel(P2pProjectListService);

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: '15%',
    },
    {
      title: '发起节点',
      dataIndex: 'senderId',
      key: 'senderId',
      width: '15%'
    },
    {
      title: '合作节点',
      dataIndex: 'receiverId',
      key: 'receiverId',
      width: '15%'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '15%'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '15%',
      sorter: true
    },
    {
      title: '操作',
      key: 'action',
      width: '15%'
    },
  ];

  const { pathname } = useLocation();

  const { handleCreateProject } = projectListModel;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { displayProjectList: projectList } = p2pProjectService;

  const { Title, Paragraph } = Typography;

  const { nodeId } = parse(window.location.search);

  useEffect(() => {
    p2pProjectService.getListProject();
  }, []);

  const [editProjectData, setEditProjectData] = useState({});

  const [hoverCurrent, setHoverCurrent] = useState(-1);

  const { Link } = Typography;

  const loadMore = isP2PWorkbench(pathname) && projectList.length > 6 && (
    <div className={styles.showAll}>
      <Link
        style={{ color: 'rgba(0,0,0,0.45)' }}
        onClick={() => {
          history.push(`/edge?nodeId=${nodeId}&tab=my-project`);
        }}
      >
        查看全部
      </Link>
    </div>
  );

  const [searchInput, setSearchInput] = useState('');
  const searchProject = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    projectListModel.searchProject(e.target.value);
  };

  useEffect(() => {
    setSearchInput('');
  }, [
    projectListModel.radioFilterState,
    projectListModel.computeMode,
    projectListModel.selectState,
  ]);

  return (
    <div
      className={classNames(styles.projectList, {
        [styles.p2pProjectList]: isP2PWorkbench(pathname),
      })}
    >
      <EdgeRouteWrapper>
        <div className={styles.projectListHeader}>
          {isP2PWorkbench(pathname) ? (
            <div className={styles.headerTitle}>我的项目</div>
          ) : (
            <Space size="middle" wrap>
              <Input
                placeholder="搜索项目"
                onChange={(e) => searchProject(e)}
                style={{ width: 200 }}
                value={searchInput}
                suffix={
                  <SearchOutlined
                    style={{
                      color: '#aaa',
                    }}
                  />
                }
              />
              <RadioGroup
                value={projectListModel.radioFilterState}
                onChange={projectListModel.changefilterState}
              />
            </Space>
          )}
          <Button type="primary" onClick={handleCreateProject}>
            新建项目
          </Button>
          <P2PCreateProjectModal
            visible={projectListModel.showCreateProjectModel}
            close={() => {
              projectListModel.showCreateProjectModel = false;
            }}
            onOk={() => p2pProjectService.getListProject()}
          />
        </div>
      </EdgeRouteWrapper>
      <Spin
        spinning={projectListModel.projectListService.projectListLoading}
        className={styles.spin}
      >
        <div></div>
      </Spin>
      {projectList.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
          <div className={styles.content}>
            <Table
                loading={projectListModel.projectListService.projectListLoading}
                dataSource={projectList}
                columns={columns}
                onChange={(pagination, filters, sorter) =>
                    projectListModel.typeFilter(filters, sorter as { order: string; field: string })
                }
                size="small"
                rowKey={(record) => record.id as string}
            />
          </div>
      )}
      {loadMore}
      <EditProjectModal
        isModalOpen={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
        data={editProjectData}
        onEdit={p2pProjectService.projectEdit}
      />
    </div>
  );
};

export class ProjectListModel extends Model {
  readonly projectListService;

  sortRule = {};

  constructor() {
    super();
    this.projectListService = getModel(P2pProjectListService);
  }

  nodeId: string | undefined = undefined;

  onViewMount() {
    const { nodeId } = parse(window.location.search);
    if (nodeId) {
      this.nodeId = nodeId as string;
    }
    this.resetFilters();
  }

  pipelines: API.GraphMetaVO[] = [];

  showCreateProjectModel = false;

  radioFilterState = RadioGroupState.ALL;
  selectState = SelectProjectState.ALL;
  computeMode = ComputeModeType.ALL;

  changefilterState = (value: RadioGroupState) => {
    this.resetFilters();
    this.radioFilterState = value;
    this.projectListService.displayProjectList =
      this.projectListService.projectList.filter((i) => {
        if (value === RadioGroupState.ALL) {
          return i;
        } else if (value === RadioGroupState.APPLY) {
          return i.initiator && i.initiator === this.nodeId;
        } else if (value === RadioGroupState.PROCESS) {
          return (
            i.partyVoteInfos &&
            (i.partyVoteInfos || []).some((item) => item.nodeId === this.nodeId)
          );
        }
      });
  };

  changeProjectState = (value: SelectProjectState) => {
    this.resetFilters();
    this.selectState = value;
    this.projectListService.displayProjectList =
      this.projectListService.projectList.filter((i) => {
        if (!i.status) return;
        if (value === SelectProjectState.ALL) {
          return i;
        } else if (value === SelectProjectState.ARCHIVED) {
          return i.status && i.status === SelectProjectState.ARCHIVED;
        } else if (value === SelectProjectState.REVIEWING) {
          return i.status && i.status === SelectProjectState.REVIEWING;
        }
      });
  };

  searchProject = (value: string) => {
    this.projectListService.displayProjectList =
      this.projectListService.projectList.filter((i) => {
        if (!i.projectName) return;
        return i.projectName?.indexOf(value) >= 0;
      });
  };

  onSelectProject = (e: string) => {
    this.resetFilters();
    this.computeMode = e as ComputeModeType;
    this.projectListService.displayProjectList =
      this.projectListService.projectList.filter((i) => {
        if (e === ComputeModeType.ALL) {
          return i;
        } else if (e === ComputeModeType.TEE) {
          return i.computeMode && i.computeMode.indexOf(ComputeModeType.TEE) >= 0;
        } else if (e === ComputeModeType.MPC) {
          // 兼容除tee外的
          return i.computeMode && !(i.computeMode.indexOf(ComputeModeType.TEE) >= 0);
        }
      });
  };

  typeFilter = (
      _tableInfo: Record<string, FilterValue | null>,
      sort: { order: string; field: string },
  ) => {
    if (sort?.order) {
      this.sortRule = {
        [sort.field]: sort.order === 'ascend' ? 'ASC' : 'DESC',
      };
    } else {
      this.sortRule = {};
    }
    this.projectListService.getListProject();
  };

  resetFilters = () => {
    this.computeMode = ComputeModeType.ALL;
    this.radioFilterState = RadioGroupState.ALL;
    this.selectState = SelectProjectState.ALL;
  };

  handleCreateProject = () => {
    this.showCreateProjectModel = true;
  };
}
