import {SearchOutlined} from '@ant-design/icons';
import {Empty, Table, Tag} from 'antd';
import {Button, Typography, Tooltip, Input, Space} from 'antd';
import {Spin} from 'antd';
import classNames from 'classnames';
import {parse} from 'query-string';
import type {ChangeEvent} from 'react';
import {useEffect, useState} from 'react';
import React from 'react';
import {history, useLocation} from 'umi';

import {
  P2PCreateProjectModal
} from '@/modules/create-project/p2p-create-project/p2p-create-project.view';
import {EditProjectModal} from '@/modules/project-list/components/edit-project';
import {getModel, Model, useModel} from '@/util/valtio-helper';

import {
  RadioGroup,
  RadioGroupState,
} from '../p2p-project-list/components/common';

import styles from './index.less';
import {P2pProjectListService} from './p2p-project-list.service';
import type {FilterValue} from "antd/es/table/interface";

export const EdgeRouteWrapper = (props: { children?: React.ReactNode }) => {
  const {children} = props;

  const {pathname} = useLocation();
  if (children === undefined || children === null) return null;
  if (pathname !== '/edge') return null;
  return <>{pathname === '/edge' && <>{children}</>}</>;
};

export const P2pProjectListComponent: React.FC = () => {
  const ownerId = localStorage.getItem('ownerId');

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
      width: '15%',
      render: (status: string) => {
        return (
            <strong>{status}</strong>
        );
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '15%',
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        return new Date(a.createTime) > new Date(b.createTime) ? 1 : -1;
      },
    },
    {
      title: '操作',
      dataIndex: ['receiverId', 'status'],
      width: '15%',
      render: (text: string, record: any) => {
        return record.receiverId === ownerId && record.status === 'pending' &&
            (<><Button onClick={() =>
                p2pProjectService.handleProject(record.id, 'accept')}>接受</Button>
              <Button onClick={() =>
                  p2pProjectService.handleProject(record.id, 'reject')}>拒绝</Button></>)
      }
    }
  ];

  const {pathname} = useLocation();

  const {handleCreateProject} = projectListModel;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {displayProjectList: projectList} = p2pProjectService;

  const {nodeId} = parse(window.location.search);

  useEffect(() => {
    p2pProjectService.getProjectList();
  }, []);

  const [editProjectData, setEditProjectData] = useState({});

  const {Link} = Typography;

  const loadMore = projectList.length > 6 && (
      <div className={styles.showAll}>
        <Link
            style={{color: 'rgba(0,0,0,0.45)'}}
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

  const isP2PWorkbench = (pathname: string) => {
    const {search} = window.location;
    const {tab} = parse(search);
    return pathname === '/edge' && tab === 'workbench';
  };

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
                      style={{width: 200}}
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
                onOk={() => p2pProjectService.getProjectList()}
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
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        ) : (
            <div className={styles.content}>
              <Table
                  loading={projectListModel.projectListService.projectListLoading}
                  dataSource={projectList}
                  columns={columns}
                  onChange={(pagination, filters, sorter) =>
                      projectListModel.typeFilter(filters, sorter as {
                        order: string;
                        field: string
                      })
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
    const {nodeId} = parse(window.location.search);
    if (nodeId) {
      this.nodeId = nodeId as string;
    }
    this.resetFilters();
  }

  showCreateProjectModel = false;

  radioFilterState = RadioGroupState.ALL;

  changefilterState = (value: RadioGroupState) => {
    this.resetFilters();
    this.radioFilterState = value;
    this.projectListService.displayProjectList =
        this.projectListService.projectList.filter((i) => {
          if (value === RadioGroupState.ALL) {
            return i;
          } else if (value === RadioGroupState.APPLY) {
            return i.senderId === this.nodeId;
          } else if (value === RadioGroupState.PROCESS) {
            return i.receiverId === this.nodeId;
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
    this.projectListService.getProjectList();
  };

  resetFilters = () => {
    this.radioFilterState = RadioGroupState.ALL;
  };

  handleCreateProject = () => {
    this.showCreateProjectModel = true;
  };
}
