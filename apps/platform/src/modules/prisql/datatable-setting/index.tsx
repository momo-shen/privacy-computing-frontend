import React, {type ChangeEvent, useEffect, useState} from 'react';
import {Button, Empty, Form, Input, message, Modal, Select, Space, Table} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import {MinusSquare, Plus} from "lucide-react";
import styles from "@/modules/p2p-project-list/index.less";
import './index.less';
import {
  DatatableSettingService
} from "@/modules/prisql/datatable-setting/datatable-setting.service";
import {getModel, Model, useModel} from "@/util/valtio-helper";
import {parse} from "query-string";
import {useLocation} from "umi";
import {toNumber} from "lodash";

export const DatatableSetting = () => {
  const datatableSettingListModel = useModel(DatatableSettingListModel);
  const [form] = Form.useForm();
  const { search, pathname } = useLocation();
  const { projectId } = parse(search);
  const userId = localStorage.getItem('userId');
  const datatableSettingService = useModel(DatatableSettingService);
  const {displayDatatableList: datatableList} = datatableSettingService;

  useEffect(() => {
    datatableSettingService.getDatatableList(projectId as string, userId as string);
  }, []);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedDatatableId, setSelectedDatatableId] = useState(0);
  const {cclListTmp: cclList} = datatableSettingService;
  const [cclListTmp2, setCclListTmp2] = useState<API.PriSqlColumnAccess[]>([]);

  const changeCCL = () => {
    let flag = false;
    cclList.forEach((ccl) => {
      if (ccl.member === '' || ccl.columnName === '' || ccl.columnDatatype === '' || ccl.access === '') {
        flag = true;
      }
    });
    if (flag) {
      message.error('请填写完整');
      return;
    } else {
      datatableSettingService.handleCclList(selectedDatatableId, cclList);
      setIsConfigModalOpen(false);
    }
  };

  const handleAddModalCancel = () => {
    setIsAddModalOpen(false);
  };

  const handleConfigModalCancel = () => {
    setIsConfigModalOpen(false);
  };

  const addDatatable = () => {
    form
    .validateFields()
    .then(async (values) => {
      try {
        let datatable: API.PriSqlDatatable = {
          projectId: projectId as string,
          name: values.name,
          refTableName: values.refTableName,
          owner: userId as string,
          connectionStr: values.connectionStr
        };
        await datatableSettingService.createDatatable(datatable);
        setIsAddModalOpen(false);
        form.resetFields();
        message.success('添加数据表成功');
      } catch (e) {
        if (e instanceof Error) {
          message.error(e.message);
        }
      }
      return;
    })
    .catch(() => {
      //
    });
  };

  const [searchInput, setSearchInput] = useState('');
  const searchDatatable = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    datatableSettingListModel.searchDatatable(e.target.value);
  };

  const columns = [
    {
      title: '表名称',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: '关联表',
      dataIndex: 'refTableName',
      key: 'refTableName',
      width: '15%',
    },
    {
      title: '数据来源',
      dataIndex: 'connectionStr',
      key: 'connectionStr',
      width: '50%'
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text: string, record: any) => {
        return (<><Button onClick={() => onBtnClick('configCCL', record.id)}>修改权限</Button>
          <Button onClick={() => onBtnClick('delete', record.id)}>删除</Button></>)
      }
    }
  ];

  enum Constraint {
    PLAINTEXT = 'plain',
    ENCRYPTED_ONLY = 'encrypt',
    PLAINTEXT_AFTER_JOIN = 'join',
    PLAINTEXT_AFTER_GROUP_BY = 'groupby',
    PLAINTEXT_AFTER_COMPARE = 'compare',
    PLAINTEXT_AFTER_AGGREGATE = 'aggregate',
    PLAINTEXT_AS_JOIN_PAYLOAD = 'joinpayload'
  };

  enum Datatype {
    INT = 'int',
    DOUBLE = 'double',
    VARCHAR = 'varchar'
  };

  const CONSTRAINT = [
    Constraint.PLAINTEXT,
    Constraint.ENCRYPTED_ONLY,
    Constraint.PLAINTEXT_AFTER_JOIN,
    Constraint.PLAINTEXT_AFTER_GROUP_BY,
    Constraint.PLAINTEXT_AFTER_COMPARE,
    Constraint.PLAINTEXT_AFTER_AGGREGATE,
    Constraint.PLAINTEXT_AS_JOIN_PAYLOAD
  ];

  const DATATYPE = [
    Datatype.INT,
    Datatype.DOUBLE,
    Datatype.VARCHAR
  ];

  const cclColumns = [
    {
      title: '列',
      dataIndex: 'columnName',
      key: 'columnName',
      width: '20%',
      render: (text: string, record: any) => (
          <Input
              value={text}
              size="small"
              style={{width: '100%'}}
              required
              onChange={(e) => {
                const newCclList = cclList.map((c) => {
                  if (c.rowId === record.rowId) {
                    return {
                      ...c,
                      'columnName': e.target.value,
                    };
                  }
                  return c;
                });
                setCclListTmp2(newCclList);
              }}
              onBlur={() => {
                datatableSettingListModel.setCclListTmp(cclListTmp2);
              }}
          />
      ),
    },
    {
      title: '列数据类型',
      dataIndex: 'columnDatatype',
      key: 'columnDatatype',
      width: '20%',
      render: (text: string, record: any) => (
          <Select
              options={DATATYPE.map((c) => ({label: c, value: c}))}
              value={text}
              size="small"
              style={{width: '100%'}}
              popupClassName="datatype-select"
              defaultValue={Datatype.INT}
              onChange={(value) => {
                const newCclList = cclList.map((c) => {
                  if (c.rowId === record.rowId) {
                    return {
                      ...c,
                      'columnDatatype': value,
                    };
                  }
                  return c;
                });
                setCclListTmp2(newCclList);
              }}
              onBlur={() => {
                datatableSettingListModel.setCclListTmp(cclListTmp2);
              }}
          />
      ),
    },
    {
      title: '用户id',
      dataIndex: 'member',
      key: 'member',
      width: '20%',
      render: (text: string, record: any) => (
          <Input
              value={text}
              size="small"
              style={{width: '100%'}}
              required
              onChange={(e) => {
                const newCclList = cclList.map((c) => {
                  if (c.rowId === record.rowId) {
                    return {
                      ...c,
                      'member': e.target.value,
                    };
                  }
                  return c;
                });
                setCclListTmp2(newCclList);
              }}
              onBlur={() => {
                datatableSettingListModel.setCclListTmp(cclListTmp2);
              }}
          />
      ),
    },
    {
      title: '列权限',
      dataIndex: 'access',
      key: 'access',
      width: '40%',
      render: (text: string, record: any) => (
          <Select
              options={CONSTRAINT.map((c) => ({label: c, value: c}))}
              value={text}
              size="small"
              style={{width: '100%'}}
              popupClassName="ccl-select"
              defaultValue={Constraint.PLAINTEXT}
              onChange={(value) => {
                const newCclList = cclList.map((c) => {
                  if (c.rowId === record.rowId) {
                    return {
                      ...c,
                      'access': value,
                    };
                  }
                  return c;
                });
                setCclListTmp2(newCclList);
              }}
              onBlur={() => {
                datatableSettingListModel.setCclListTmp(cclListTmp2);
              }}
          />
      ),
    },
    {
      title: '操作',
      dataIndex: ['id'],
      render: (text: string, record: any) => (
          <MinusSquare
              size={14}
              color="#182431"
              cursor="pointer"
              onClick={() => removeAccess(record.rowId)}
          />
      ),
    },
  ];

  const removeAccess = (rowId: string) => {
    const newCclList = cclList.filter((c) => c.rowId !== rowId);
    setCclListTmp2(newCclList);
    datatableSettingListModel.setCclListTmp(newCclList);
  };

  const onBtnClick = (key: string, id?: string) => {
    switch (key) {
      case 'add':
        setIsAddModalOpen(true);
        break;
      case 'configCCL':
        setSelectedDatatableId(toNumber(id));
        setIsConfigModalOpen(true);
        break;
      case 'delete':
        datatableSettingService.deleteDatatable(datatableList.find(datatable => datatable.id === id) as API.PriSqlDatatable);
        break;
      default:
        break;
    }
  };

  const addCcl = () => {
    const newCclList = [...cclList, {
      datatableId: selectedDatatableId,
      columnName: '',
      columnDatatype: '',
      member: '',
      access: '',
      rowId: String(cclList.length),
    }];
    console.log(newCclList)
    setCclListTmp2(newCclList);
    datatableSettingListModel.setCclListTmp(newCclList);
  };

  return (
      <div className="prisql-datatable-setting">
        <Space size="middle" wrap style={{marginBottom: 16}}>
          <Input
              placeholder="搜索数据表"
              onChange={(e) => searchDatatable(e)}
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
          <Button
              icon={<Plus size={16}/>}
              className="btn"
              onClick={() => onBtnClick('add')}
          />
        </Space>

        {datatableList.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        ) : (
            <div className={styles.content}>
              <Table
                  loading={datatableSettingService.loading}
                  dataSource={datatableList}
                  columns={columns}
                  size="small"
                  rowKey={(record) => record.id as string}
              />
            </div>
        )}

        <Modal
            open={isAddModalOpen}
            destroyOnClose={true}
            title="添加数据表"
            onOk={addDatatable}
            onCancel={handleAddModalCancel}
        >
          <Form
              form={form}
              requiredMark={true}
              labelCol={{span: 6}}
              wrapperCol={{span: 18}}
              style={{marginTop: 24, maxHeight: 500, overflowY: 'auto'}}
          >
            <Form.Item
                label="表名称"
                name="name"
                rules={[{required: true, message: '请输入表名称'}]}
            >
              <Input maxLength={16}/>
            </Form.Item>
            <Form.Item
                label="关联表"
                name="refTableName"
                rules={[{required: true, message: '请输入关联表名称'}]}
            >
              <Input maxLength={16}/>
            </Form.Item>
            <Form.Item
                label="数据来源"
                name="connectionStr"
                rules={[{required: true, message: '请输入数据来源'}]}
            >
              <Input/>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
            width={720}
            open={isConfigModalOpen}
            destroyOnClose={true}
            title="修改权限"
            onOk={() => changeCCL()}
            onCancel={handleConfigModalCancel}
            afterOpenChange={(open) => {
              if (open) {
                datatableSettingService.getCclList(selectedDatatableId).then((res) => {
                  setCclListTmp2(res);
                });
              }
            }}
        >
          <div style={{marginBottom: '8px'}}>表名：{datatableList.find(datatable => datatable.id == String(selectedDatatableId))?.name}</div>
          <Table
              loading={datatableSettingService.cclLoading}
              className="ccl-table"
              dataSource={cclListTmp2}
              rowKey={(record) => record.rowId as string}
              pagination={false}
              columns={cclColumns}
              size="small"
          />
          <Button
              type="dashed"
              onClick={() => addCcl()}
              block
              icon={<Plus size={16} color="#182431"/>}
          >
            增加列
          </Button>
        </Modal>
      </div>
  );
};

export class DatatableSettingListModel extends Model {
  readonly datatableSettingService;

  constructor() {
    super();
    this.datatableSettingService = getModel(DatatableSettingService);
  }

  searchDatatable = (value: string) => {
    this.datatableSettingService.displayDatatableList =
        this.datatableSettingService.datatableList.filter((i) => {
          if (!i.name) return;
          return i.name?.indexOf(value) >= 0;
        });
  }

  setCclListTmp = (newCclList: API.PriSqlColumnAccess[]) => {
    this.datatableSettingService.cclListTmp = newCclList;
  }
}
