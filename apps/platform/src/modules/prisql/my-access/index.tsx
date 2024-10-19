import styles from './index.less';
import React, {type ChangeEvent, useEffect, useState} from 'react';
import {Input, Space, Table} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import './index.less';
import {MyAccessService} from "@/modules/prisql/my-access/my-access.service";
import {getModel, Model, useModel} from "@/util/valtio-helper";
import {parse} from "query-string";
import {useLocation} from "umi";
import {toNumber} from "lodash";
import {
  DatatableSettingService
} from "@/modules/prisql/datatable-setting/datatable-setting.service";

export const MyAccess = () => {
  const myAccessListModel = useModel(MyAccessListModel);
  const { search, pathname } = useLocation();
  const { projectId } = parse(search);
  const userId = localStorage.getItem('userId');
  const myAccessService = useModel(MyAccessService);
  const {displayMyAccessList: myAccessList} = myAccessService;

  useEffect(() => {
    myAccessService.getMyAccessList(toNumber(projectId), userId as string);
  }, []);

  const columns = [
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: '表名',
      dataIndex: 'datatableName',
      key: 'datatableName',
    },
    {
      title: '列',
      dataIndex: 'columnName',
      key: 'columnName',
    },
    {
      title: '列数据类型',
      dataIndex: 'columnDatatype',
      key: 'columnDatatype',
    },
    {
      title: '我的权限',
      dataIndex: 'access',
      key: 'access',
    }
  ];

  const [searchInput, setSearchInput] = useState('');
  const searchAccess = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    myAccessListModel.searchMyAccess(e.target.value);
  };

  return (
      <div className="prisql-access">
        <Space size="middle" wrap style={{marginBottom: 16}}>
          <Input
              placeholder="请输入关键字进行搜索"
              onChange={(e) => searchAccess(e)}
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
        </Space>
        <div className={styles.content}>
          <Table
              loading={myAccessService.loading}
              dataSource={myAccessList}
              columns={columns}
              size="small"
              rowKey={(record) => record.id as string}
          />
        </div>
      </div>
  );
};

export class MyAccessListModel extends Model {
  readonly myAccessService;

  constructor() {
    super();
    this.myAccessService = getModel(MyAccessService);
  }

  searchMyAccess = (value: string) => {
    this.myAccessService.displayMyAccessList =
        this.myAccessService.myAccessList.filter((i) => {
          if (!i.owner || !i.datatableName || !i.columnName
          || !i.access || !i.columnDatatype) return;
          return i.owner?.indexOf(value) >= 0
              || i.datatableName?.indexOf(value) >= 0
              || i.columnName?.indexOf(value) >= 0
              || i.access?.indexOf(value) >= 0
              || i.columnDatatype?.indexOf(value) >= 0;
        });
  }
}