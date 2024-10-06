import styles from './index.less';
import React, {type ChangeEvent, useEffect, useState} from 'react';
import {Input, Space, Table} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import './index.less';

export const MyAccess = () => {

  const accessList = [
    {
      id: '1',
      owner: 'bob',
      databaseName: 'tb',
      column: 'id',
      access: 'PLAINTEXT_AFTER_JOIN'
    },
    {
      id: '2',
      owner: 'bob',
      databaseName: 'tb',
      column: 'name',
      access: 'PLAINTEXT_AFTER_GROUP_BY'
    }
  ];

  const [displayAccessList, setDisplayAccessList] = useState<any[]>([]);

  useEffect(() => {
    setDisplayAccessList(accessList);
  }, []);

  const columns = [
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: '表名',
      dataIndex: 'databaseName',
      key: 'databaseName',
    },
    {
      title: '列',
      dataIndex: 'column',
      key: 'column',
    },
    {
      title: '我的权限',
      dataIndex: 'access',
      key: 'access',
    }
  ];

  const searchAccess = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayAccessList(accessList.filter(access => (
                access.owner.toLowerCase().includes(e.target.value.toLowerCase()) ||
                access.databaseName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                access.column.toLowerCase().includes(e.target.value.toLowerCase()) ||
                access.access.toLowerCase().includes(e.target.value.toLowerCase())
            )
        )
    )
  };

  return (
      <div className="prisql-access">
        <Space size="middle" wrap style={{marginBottom: 16}}>
          <Input
              placeholder="请输入关键字进行搜索"
              onChange={(e) => searchAccess(e)}
              style={{width: 200}}
              suffix={
                <SearchOutlined
                    style={{
                      color: '#aaa',
                    }}
                />
              }
          />
        </Space>
        <div className={styles.content}>
          <Table
              dataSource={displayAccessList}
              columns={columns}
              size="small"
              rowKey={(record) => record.id as string}
          />
        </div>
      </div>
  );
};
