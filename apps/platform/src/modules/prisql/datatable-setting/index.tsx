import React, {type ChangeEvent, useEffect, useState} from 'react';
import {Button, Empty, Form, Input, message, Modal, Select, Space, Table} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import {Plus} from "lucide-react";
import styles from "@/modules/p2p-project-list/index.less";
import './index.less';

export const DatatableSetting = () => {
  const [form] = Form.useForm();

  const [datatableList, setDatatableList] = useState<any[]>([
    {id: "1", datatableName: 'ta', datatableSource: 'mysql:db1.tbl1'},
    {id: "2", datatableName: 'tb', datatableSource: 'mysql:db2.tbl2'},
  ]);

  const [displayDatatableList, setDisplayDatatableList] = useState<any[]>([]);

  const [cclList, setCclList] = useState<any[]>([
    {id: "1", column: 'id', userId: 'bob', access: 'PLAINTEXT'},
    {id: "2", column: 'age', userId: 'bob', access: 'PLAINTEXT_AFTER_COMPARE'},
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  const [selectedDatatableId, setSelectedDatatableId] = useState('');

  const getTableCCL = () => {

  };

  const changeCCL = () => {
    setIsConfigModalOpen(false);
  };

  const handleAddModalCancel = () => {
    setIsAddModalOpen(false);
  };

  const handleConfigModalCancel = () => {
    setIsConfigModalOpen(false);
  };

  useEffect(() => {
    setDisplayDatatableList(datatableList);
  }, []);

  const addDatatable = () => {
    form
    .validateFields()
    .then(async (values) => {
      try {
        // await service.inviteMember(values.name);
        const id = String(Number(datatableList[datatableList.length - 1].id) + 1);
        const newDatatableList = [...datatableList, {
          id: id,
          datatableName: values.datatableName,
          datatableSource: values.datatableSource
        }];
        setDatatableList(newDatatableList);
        setDisplayDatatableList(newDatatableList);
        form.resetFields();
        message.success('添加数据表成功');
        setIsAddModalOpen(false);
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

  const searchDatatable = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayDatatableList(datatableList.filter(datatable => datatable.datatableName.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const columns = [
    {
      title: '表名称',
      dataIndex: 'datatableName',
      key: 'datatableName',
      width: '30%',
    },
    {
      title: '数据来源',
      dataIndex: 'datatableSource',
      key: 'datatableSource',
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
    UNKNOWN = 'UNKNOWN',
    PLAINTEXT = 'PLAINTEXT',
    ENCRYPTED_ONLY = 'ENCRYPTED_ONLY',
    PLAINTEXT_AFTER_JOIN = 'PLAINTEXT_AFTER_JOIN',
    PLAINTEXT_AFTER_GROUP_BY = 'PLAINTEXT_AFTER_GROUP_BY',
    PLAINTEXT_AFTER_COMPARE = 'PLAINTEXT_AFTER_COMPARE',
    PLAINTEXT_AFTER_AGGREGATE = 'PLAINTEXT_AFTER_AGGREGATE',
    PLAINTEXT_AS_JOIN_PAYLOAD = 'PLAINTEXT_AS_JOIN_PAYLOAD'
  }

  const CONSTRAINT = [
    Constraint.UNKNOWN,
    Constraint.PLAINTEXT,
    Constraint.ENCRYPTED_ONLY,
    Constraint.PLAINTEXT_AFTER_JOIN,
    Constraint.PLAINTEXT_AFTER_GROUP_BY,
    Constraint.PLAINTEXT_AFTER_COMPARE,
    Constraint.PLAINTEXT_AFTER_AGGREGATE,
    Constraint.PLAINTEXT_AS_JOIN_PAYLOAD
  ];

  const cclColumns = [
    {
      title: '列',
      dataIndex: 'column',
      key: 'column',
    },
    {
      title: '用户id',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '列权限',
      dataIndex: 'access',
      key: 'access',
      render: (text: string, record: any) => (
          <Select
              options={CONSTRAINT.map((c) => ({label: c, value: c}))}
              value={text}
              size="small"
              style={{width: 260}}
              popupClassName="ccl-select"
              onChange={(value) => {
                const newCclList = cclList.map((c) => {
                  if (c.column === record.column) {
                    return {
                      ...c,
                      'access': value,
                    };
                  }
                  return c;
                });
                setCclList(newCclList);
              }}
          />
      ),
    }];

  const onBtnClick = (key: string, id?: string) => {
    switch (key) {
      case 'add':
        setIsAddModalOpen(true);
        break;
      case 'configCCL':
        setSelectedDatatableId(id as string);
        setIsConfigModalOpen(true);
        break;
      case 'delete':
        const newDatatableList = datatableList.filter(datatable => datatable.id !== id);
        setDatatableList(newDatatableList);
        setDisplayDatatableList(newDatatableList);
        break;
      default:
        break;
    }
  };

  const addColumn = () => {

  };

  return (
      <div className="prisql-datatable-setting">
        <Space size="middle" wrap style={{marginBottom: 16}}>
          <Input
              placeholder="搜索数据表"
              onChange={(e) => searchDatatable(e)}
              style={{width: 200}}
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
                  dataSource={displayDatatableList}
                  columns={columns}
                  size="small"
                  rowKey={(record) => record.userId as string}
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
                name="datatableName"
                rules={[{required: true, message: '请输入表名称'}]}
            >
              <Input maxLength={16}/>
            </Form.Item>
            <Form.Item
                label="数据来源"
                name="datatableSource"
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
                getTableCCL();
              }
            }}
        >
          <div
              style={{marginBottom: '8px'}}>表名：{datatableList.find(datatable => datatable.id === selectedDatatableId)?.datatableName}</div>
          <Table
              className="ccl-table"
              dataSource={cclList}
              rowKey="column"
              pagination={false}
              columns={cclColumns}
              size="small"
          />
          <Button
              type="dashed"
              onClick={() => addColumn()}
              block
              icon={<Plus size={16} color="#182431" />}
          >
            增加列
          </Button>
        </Modal>
      </div>
  );
};
