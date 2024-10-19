import React, {type ChangeEvent, useEffect, useState} from 'react';
import {Button, Empty, Form, Input, message, Popover, Space, Table} from "antd";
import {Plus} from "lucide-react";
import styles from "@/modules/p2p-project-list/index.less";
import './index.less';
import {SearchOutlined} from "@ant-design/icons";
import {Model, getModel, useModel} from "@/util/valtio-helper";
import {UserManagementService} from "@/modules/prisql/user-management/user-management.service";
import {useLocation} from "umi";
import {parse} from "query-string";

export const UserManagement = () => {
  const memberStatusListModel = useModel(MemberStatusListModel);
  const [form] = Form.useForm();
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const formValues = Form.useWatch([], form);

  const { search, pathname } = useLocation();
  const { projectId } = parse(search);
  const userManagementService = useModel(UserManagementService);

  const {displayMemberStatusList: memberStatusList} = userManagementService;

  useEffect(() => {
    userManagementService.getMemberStatusList(projectId as string);
  }, []);

  const addMember = () => {
    form
    .validateFields()
    .then(async (values) => {
      setAddLoading(true);
      try {
        await userManagementService.inviteMember(projectId as string, values.member);
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
              name="member"
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
                  disabled={formValues && !formValues.member}
                  loading={addLoading}
              >
                邀请
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
  );

  const [searchInput, setSearchInput] = useState('');
  const searchMemberStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    memberStatusListModel.searchMemberStatus(e.target.value);
  };

  const columns = [
    {
      title: '用户id',
      dataIndex: 'member',
      key: 'member',
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
              onChange={(e) => searchMemberStatus(e)}
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

        {memberStatusList.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        ) : (
            <div className={styles.content}>
              <Table
                  loading={userManagementService.loading}
                  dataSource={memberStatusList}
                  columns={columns}
                  size="small"
                  rowKey={(record) => record.id as string}
              />
            </div>
        )}
      </div>
  );
};

export class MemberStatusListModel extends Model {
  readonly userManagementService;

  constructor() {
    super();
    this.userManagementService = getModel(UserManagementService);
  }

  searchMemberStatus = (value: string) => {
    this.userManagementService.displayMemberStatusList =
        this.userManagementService.memberStatusList.filter((i) => {
          if (!i.member) return;
          return i.member?.indexOf(value) >= 0;
        });
  }
}
