import {SearchOutlined} from '@ant-design/icons';
import {Card, Empty, Modal, Table, Tag} from 'antd';
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
import {getModel, Model, useModel} from '@/util/valtio-helper';

import {
  RadioGroup,
  RadioGroupState,
} from '../p2p-project-list/components/common';

import styles from './index.less';
import {P2pProjectListService} from './p2p-project-list.service';
import type {FilterValue} from "antd/es/table/interface";
import {ColumnsType} from "antd/es/table";

export const EdgeRouteWrapper = (props: { children?: React.ReactNode }) => {
  const {children} = props;

  const {pathname} = useLocation();
  if (children === undefined || children === null) return null;
  if (pathname !== '/home') return null;
  return <>{pathname === '/home' && <>{children}</>}</>;
};

export const P2pProjectListComponent: React.FC = () => {
  const userId = localStorage.getItem('userId');

  const projectListModel = useModel(ProjectListModel);
  const p2pProjectService = useModel(P2pProjectListService);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordId, setRecordId] = useState('');
  const [receiverOutputPath, setReceiverOutputPath] = useState('');

  const handleOk = async () => {
    await p2pProjectService.handleProject(recordId, 'accepted', receiverOutputPath);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const acceptProject = (recordId: string) => {
    setIsModalOpen(true);
    setRecordId(recordId);
  }

  const columns: ColumnsType<API.PsiProject> = [
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
      width: '15%'
    },
    {
      title: '操作',
      dataIndex: ['receiverId', 'status'],
      width: '15%',
      render: (text: string, record: any) => {
        return record.receiverId === userId && record.status === 'pending' &&
            (<><Button onClick={() => acceptProject(record.id)}>接受</Button>
              <Button onClick={() =>
                  p2pProjectService.handleProject(record.id, 'rejected', '')}>拒绝</Button></>)
      }
    }
  ];

  const {pathname} = useLocation();

  const {handleCreateProject} = projectListModel;

  const {displayProjectList: projectList} = p2pProjectService;

  const {displayPsProjectList: psProjectList} = p2pProjectService;

  const {nodeId} = parse(window.location.search);

  useEffect(() => {
    p2pProjectService.getProjectList();
    p2pProjectService.getPsProjectList();
  }, []);

  const {Link} = Typography;

  const loadMore = projectList.length > 6 && (
      <div className={styles.showAll}>
        <Link
            style={{color: 'rgba(0,0,0,0.45)'}}
            onClick={() => {
              history.push(`/home?nodeId=${nodeId}&tab=my-project`);
            }}
        >
          查看全部
        </Link>
      </div>
  );

  const loadMoreForPS = psProjectList.length > 6 && (
      <div className={styles.showAll}>
        <Link
            style={{color: 'rgba(0,0,0,0.45)'}}
            onClick={() => {
              history.push(`/home?nodeId=${nodeId}&tab=my-project`);
            }}
        >
          查看全部
        </Link>
      </div>
  );

  const acceptPSProject = (id: string | undefined) => {

  };

  const rejectPSProject = (id: string | undefined) => {

  };

  const [searchInput, setSearchInput] = useState('');
  const searchProject = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    projectListModel.searchProject(e.target.value);
    projectListModel.searchPsProject(e.target.value);
  };

  useEffect(() => {
    setSearchInput('');
  }, [
    projectListModel.radioFilterState
  ]);

  const isP2PWorkbench = (pathname: string) => {
    const {search} = window.location;
    const {tab} = parse(search);
    return pathname === '/home' && tab === 'workbench';
  };

  const onClickPsProject = (item: API.PriSqlProject) => {
    if (item.owner === userId || (item.members && userId && item.members.indexOf(userId) > -1)) {
      history.push(`/prisql?nodeId=${nodeId}`);
    }
  }

  return (
      <>
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
          <h2>PSI</h2>
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
          <h2>PriSql</h2>
          {psProjectList.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
          ) : (
              <div className={styles.prisqlList}>
                {
                  psProjectList.map((item, index) => {
                    return (
                        <Card className={styles.prisqlCard} hoverable onClick={() => onClickPsProject(item)}>
                          <div className={styles.prisqlCardInfo}>
                            <div>
                              <div>{item.projectName}</div>
                              <div style={{textWrap: 'nowrap'}}>Owner: {item.owner}</div>
                            </div>
                            {item.owner !== userId && item.members && userId && item.members.indexOf(userId) < 0 && (
                                <div className={styles.prisqlCardOp}>
                                  <Button onClick={e => {e.stopPropagation(); acceptPSProject(item.id)}}>接受</Button>
                                  <Button style={{marginTop: '4px'}} onClick={e => {e.stopPropagation(); rejectPSProject(item.id)}}>拒绝</Button>
                                </div>
                            )}
                          </div>
                        </Card>
                    )
                  })
                }
              </div>
          )}
          {loadMoreForPS}
        </div>
        <Modal title="输出目录路径" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
               okButtonProps={{disabled: receiverOutputPath === ''}}>
          <Input placeholder="请输入输出目录路径"
                 type="text"
                 value={receiverOutputPath}
                 onChange={e => setReceiverOutputPath(e.target.value)}/>
        </Modal>
      </>
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
    this.projectListService.displayPsProjectList =
        this.projectListService.psProjectList.filter((i) => {
          if (value === RadioGroupState.ALL) {
            return i;
          } else if (value === RadioGroupState.APPLY) {
            return i.owner === this.nodeId;
          } else if (value === RadioGroupState.PROCESS) {
            return i.owner !== this.nodeId;
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

  searchPsProject = (value: string) => {
    this.projectListService.displayPsProjectList =
        this.projectListService.psProjectList.filter((i) => {
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
