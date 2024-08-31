import {
  SearchOutlined,
  ReloadOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Badge, Button, Input, Space, Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import { parse } from 'query-string';
import type { ChangeEvent } from 'react';

import { getModel, Model, useModel } from '@/util/valtio-helper';

import { AddCooperativeNodeDrawer } from './add-cooperative-node-modal';
import { CooperativeNodeDetailDrawer } from './cooperative-node-detail-modal';
import { CooperativeNodeService } from './cooperative-node.service';
import { DeleteCooperativeNodeModal } from './delete-modal';
import { EditCooperativeNodeModal } from './edit-modal';
import styles from './index.less';

export const CooperativeNodeListComponent = () => {
  const viewInstance = useModel(CooperativeNodeView);
  const service = useModel(CooperativeNodeService);
  const columns: ColumnsType<API.NodeRouterVO> = [
    {
      title: '合作节点',
      dataIndex: 'srcNodeId',
      key: 'srcNodeId',
      width: '15%',
      render: (text: string, record) => {
        return (
          <>
            <Typography.Text
              onClick={() => {
                viewInstance.clickedCooperativeNode = record;
                viewInstance.showCooperativeNodeDetailDrawer = true;
              }}
              style={{ color: '#1677ff', cursor: 'pointer' }}
              ellipsis={{
                tooltip: record.srcNode?.nodeName,
              }}
            >
              {record.dstNode?.type === 'embedded' &&
                record.srcNode?.type === 'embedded' && (
                  <Tag className={styles.embeddedTag}>内置</Tag>
                )}
              {record.srcNode?.nodeName}
            </Typography.Text>
            <div>
              <Typography.Text
                className={styles.idText}
                ellipsis={{
                  tooltip: text,
                }}
              >
                {text}
              </Typography.Text>
            </div>
          </>
        );
      },
    },
    {
      title: '合作节点通讯地址',
      dataIndex: 'srcNetAddress',
      key: 'srcNetAddress',
      width: '15%',
      render: (srcNetAddress: string) => (
        <Typography.Text
          ellipsis={{
            tooltip: srcNetAddress,
          }}
        >
          {srcNetAddress || '- -'}
        </Typography.Text>
      ),
    },
    {
      title: (
        <>
          本方通讯地址
          <Tooltip title="本方节点对外暴露的IP地址">
            <QuestionCircleOutlined style={{ marginLeft: '6px', cursor: 'pointer' }} />
          </Tooltip>
        </>
      ),
      dataIndex: 'dstNetAddress',
      key: 'dstNetAddress',
      width: '14%',
      render: (dstNetAddress: string) => (
        <Typography.Text
          ellipsis={{
            tooltip: dstNetAddress,
          }}
        >
          {dstNetAddress || '- -'}
        </Typography.Text>
      ),
    },
    {
      title: '发起合作节点',
      dataIndex: 'sourceNodeName',
      key: 'sourceNodeName',
      ellipsis: true,
      width: '12%',
      render: (srcNetAddress: string, record) => (
        <Typography.Text
          ellipsis={{
            tooltip: record.srcNode?.nodeName,
          }}
        >
          {record.srcNode?.nodeName || '- -'}
        </Typography.Text>
      ),
    },
    {
      title: '通讯状态',
      dataIndex: 'status',
      key: 'status',
      width: '18%'
    },
    {
      title: '合作时间',
      dataIndex: 'gmtCreate',
      width: '15%',
      sorter: true
    },
    {
      title: '编辑时间',
      dataIndex: 'gmtModified',
      width: '15%',
      sorter: true
    },
    {
      title: '操作',
      key: 'action',
      width: '15%'
    },
  ];

  return (
    <div className={styles.cooperativeNodeList}>
      <div className={styles.nodeListHeader}>
        <Space size="middle">
          <Input
            placeholder="搜索节点名/ID/通讯地址"
            onChange={(e) => viewInstance.searchNode(e)}
            style={{ width: 200 }}
            suffix={
              <SearchOutlined
                style={{
                  color: '#aaa',
                }}
              />
            }
          />
        </Space>
        <Tooltip
          title='title'
        >
          <Button
            type="primary"
            onClick={() => (viewInstance.showAddCooperativeNodeDrawer = true)}
          >
            添加合作节点
          </Button>
        </Tooltip>
      </div>

      <div className={styles.content}>
        <Table
          loading={viewInstance.loading}
          dataSource={viewInstance.nodeList}
          columns={columns}
          onChange={(pagination, filters, sorter) =>
            viewInstance.typeFilter(filters, sorter as { order: string; field: string })
          }
          pagination={{
            total: viewInstance.totalNum || 1,
            current: viewInstance.pageNumber,
            pageSize: viewInstance.pageSize,
            onChange: (page, pageSize) => {
              viewInstance.pageNumber = page;
              viewInstance.pageSize = pageSize;
            },
            size: 'default',
            showSizeChanger: true,
          }}
          size="small"
          rowKey={(record) => record.routeId as string}
        />
      </div>

      <AddCooperativeNodeDrawer
        open={viewInstance.showAddCooperativeNodeDrawer}
        onClose={() => (viewInstance.showAddCooperativeNodeDrawer = false)}
        onOk={() => viewInstance.getNodeList()}
      />

      {viewInstance.clickedCooperativeNode && (
        <CooperativeNodeDetailDrawer
          open={viewInstance.showCooperativeNodeDetailDrawer}
          onClose={() => (viewInstance.showCooperativeNodeDetailDrawer = false)}
          data={viewInstance.clickedCooperativeNode}
          onOk={() => viewInstance.getNodeList()}
        />
      )}
      {viewInstance.clickedCooperativeNode && (
        <EditCooperativeNodeModal
          open={viewInstance.showEditModal}
          onClose={() => (viewInstance.showEditModal = false)}
          data={viewInstance.clickedCooperativeNode}
          onOk={() => viewInstance.getNodeList()}
        />
      )}
      {viewInstance.clickedCooperativeNode && (
        <DeleteCooperativeNodeModal
          open={viewInstance.showDeleteModal}
          onClose={() => (viewInstance.showDeleteModal = false)}
          data={viewInstance.clickedCooperativeNode}
          onOk={() => viewInstance.getNodeList()}
        />
      )}
    </div>
  );
};

export class CooperativeNodeView extends Model {
  nodeList = [];

  nodeListDisplay = [];

  search = '';

  typesFilter: string[] = [];

  sortRule = {};

  pageNumber = 1;

  pageSize = 10;

  totalNum = 1;

  loading = false;
  showDeleteModal = false;

  searchDebounce: number | undefined = undefined;

  showEditModal = false;

  showAddCooperativeNodeDrawer = false;
  showCooperativeNodeDetailDrawer = false;
  clickedCooperativeNode: API.NodeRouterVO | undefined = undefined;
  drawerId = '';

  CooperativeNodeService = getModel(CooperativeNodeService);

  onViewMount() {
    this.getNodeList();
  }

  async getNodeList() {
    const { nodeId } = parse(window.location.search);
    if (!nodeId) return;
    this.loading = true;
    const list = []
    this.loading = false;
    this.totalNum = list?.data?.total || 0;
    this.nodeList = list?.data?.list || [];
    this.nodeListDisplay = this.nodeList;
  }

  searchNode = (e: ChangeEvent<HTMLInputElement>) => {
    this.search = e.target.value;
    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => {
      this.getNodeList();
    }, 300) as unknown as number;
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
    this.getNodeList();
  };

  showDrawer = (title: string, id: string) => {
    this.drawerId = id;
    this.showAddCooperativeNodeDrawer = true;
  };
}
