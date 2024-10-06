import React, {type ChangeEvent, useEffect, useState} from 'react';
import {Button, Empty, Form, Input, message, Popover, Space, Table, Tooltip} from "antd";
import {Plus} from "lucide-react";
import styles from "@/modules/p2p-project-list/index.less";
import './index.less';
import {SearchOutlined} from "@ant-design/icons";

export const UserManagement = () => {
  const [form] = Form.useForm();
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const formValues = Form.useWatch([], form);

  const [userList, setUserList] = useState<any[]>([
    {id: "1", userId: 'alice', status: 'owner'},
    {id: "2", userId: 'bob2', status: 'sent request'},
    {id: "3", userId: 'bob3', status: 'accepted'},
    {id: "4", userId: 'bob4', status: 'rejected'}
  ]);

  const [displayUserList, setDisplayUserList] = useState<any[]>([]);

  useEffect(() => {
    setDisplayUserList(userList);
  }, []);

  const addMember = () => {
    form
    .validateFields()
    .then(async (values) => {
      setAddLoading(true);
      try {
        // await service.inviteMember(values.name);
        const id = String(Number(userList[userList.length -1].id) + 1);
        const newUserList = [...userList, {id: id, userId: values.name, status: 'sent request'}];
        console.log(newUserList);
        setUserList(newUserList);
        setDisplayUserList(newUserList);
        setAddFormVisible(false);
        form.resetFields();
        message.success('请求已发送');
      } catch (e) {
        if (e instanceof Error) {
          message.error(e.message);
        }
      } finally {
        setAddLoading(false);
      }
      return;
    })
    .catch(() => {
      //
    });
  };

  const addNodeFormContent = (
      <div className="add-member">
        <Form
            form={form}
            autoComplete="off"
            requiredMark={false}
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
            style={{display: 'flex'}}
        >
          <Form.Item
              label=""
              name="name"
              rules={[
                {required: true, message: '请输入邀请者id'},
              ]}
          >
            <Input
                style={{width: 256}}
                placeholder="请输入邀请者id"
            />
          </Form.Item>
          <Form.Item wrapperCol={{offset: 4, span: 20}} style={{marginBottom: 0}}>
            <Space>
              <Button
                  htmlType="submit"
                  onClick={() => {
                    addMember();
                  }}
                  disabled={formValues && !formValues.name}
                  loading={addLoading}
              >
                邀请
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
  );

  const searchUser = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayUserList(userList.filter(user => user.userId.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const columns = [
    {
      title: '用户id',
      dataIndex: 'userId',
      key: 'userId',
      width: '50%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '50%',
      render: (status: string) => {
        return (
            <strong>{status}</strong>
        );
      }
    }
  ];

  return (
      <div className="prisql-member">
        <Space size="middle" wrap style={{marginBottom: 16}}>
          <Input
              placeholder="搜索用户"
              onChange={(e) => searchUser(e)}
              style={{width: 200}}
              suffix={
                <SearchOutlined
                    style={{
                      color: '#aaa',
                    }}
                />
              }
          />
          <Popover
              content={addNodeFormContent}
              title=""
              overlayStyle={{width: 372}}
              trigger="click"
              placement="bottomLeft"
              open={addFormVisible}
              onOpenChange={(visible) => {
                form.resetFields();
                setAddFormVisible(visible);
              }}
              arrow={false}
          >
            <Button
                icon={<Plus size={16}/>}
                className="btn"
                onClick={() => setAddFormVisible(true)}
            />
          </Popover>
        </Space>

        {userList.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        ) : (
            <div className={styles.content}>
              <Table
                  dataSource={displayUserList}
                  columns={columns}
                  size="small"
                  rowKey={(record) => record.id as string}
              />
            </div>
        )}
      </div>
  );
};
