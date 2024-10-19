import { Input, Form, Drawer, Button, Space, Radio, Tooltip, Alert } from 'antd';
import classnames from 'classnames';
import { parse } from 'query-string';
import React from 'react';
import {history, useLocation} from 'umi';
import { SwitchCard } from '@/components/switch-card';
import { HeaderModel } from '@/modules/layout/home-layout/header-view';
import { useModel } from '@/util/valtio-helper';

import {computeFuncList, ProjectType} from './compute-func-data';
import styles from './index.less';
import {P2pProjectListService} from "@/modules/p2p-project-list/p2p-project-list.service";

interface ICreateProjectModal {
  visible: boolean;
  close: () => void;
  data?: Record<string, string>;
  onOk?: () => void;
}

export const P2PCreateProjectModal = ({
  visible,
  close,
}: ICreateProjectModal) => {
  const projectService = useModel(P2pProjectListService);

  const [form] = Form.useForm();

  const projectName = Form.useWatch('projectName', form);

  const { search, pathname } = useLocation();
  const { nodeId } = parse(search);

  const handleClose = () => {
    close();
  };

  const handleOk = () => {
    form.validateFields().then(async (value) => {
      if (value.computeFunc === ProjectType.PSI) {
        history.push(`/psi?nodeId=${nodeId}`, {projectName: value.projectName});
      } else if (value.computeFunc === ProjectType.PSQL) {
        projectService.createPsProject({
          name: value.projectName,
          owner: nodeId as string
        });
      }
      handleClose();
    });
  };

  return (
    <Drawer
      className={styles.createModalMax}
      title={'新建项目'}
      destroyOnClose
      open={visible}
      onClose={handleClose}
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={handleClose}>取消</Button>
          <Button
            type="primary"
            onClick={handleOk}
            className={classnames({
              [styles.buttonDisable]: !projectName
            })}
          >
            创建
          </Button>
        </Space>
      }
      width={690}
    >
      <Form form={form} preserve={false} layout="vertical" requiredMark={'optional'}>
        <Form.Item
          label="项目名称"
          required
          className={styles.formLabelItem}
          name="projectName"
          rules={[
            { max: 32, message: '长度限制32' },
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9-_]+$/,
              message: '只能包含中文/英文/数字/下划线/中划线',
            },
          ]}
        >
          <Input
            placeholder="请输入中文、大小写英文、数字、下划线、中划线，32个字符以内"
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="项目描述"
          className={styles.formLabelItem}
          name="description"
          rules={[
            { max: 128, message: '长度限制128' },
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9-_]+$/,
              message: '只能包含中文/英文/数字/下划线/中划线',
            },
          ]}
          required={false}
        >
          <Input.TextArea
            placeholder="请输入128字符以内的介绍"
            allowClear
            autoSize={{
              minRows: 2,
            }}
          />
        </Form.Item>
        <Form.Item
          label="计算功能"
          required
          className={styles.formLabelItem}
          name="computeFunc"
          initialValue={computeFuncList[0].type}
        >
          <SwitchCard cardList={computeFuncList} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
