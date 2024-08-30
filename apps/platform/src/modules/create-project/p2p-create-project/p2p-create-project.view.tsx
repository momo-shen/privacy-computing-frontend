import { QuestionCircleOutlined } from '@ant-design/icons';
import { Input, Form, Drawer, Button, Space, Radio, Tooltip, Alert } from 'antd';
import classnames from 'classnames';
import { parse } from 'query-string';
import React from 'react';
import { history } from 'umi';
import { AccessWrapper, PadMode, hasAccess } from '@/components/platform-wrapper';
import { SwitchCard } from '@/components/switch-card';
import { HeaderModel } from '@/modules/layout/home-layout/header-view';
import { useModel } from '@/util/valtio-helper';

import { AddNodeTag } from '../add-node-tag';

import { computeFuncList } from './compute-func-data';
import styles from './index.less';
import { P2PCreateProjectService } from './p2p-create-project.service';

interface ICreateProjectModal {
  visible: boolean;
  close: () => void;
  data?: Record<string, string>;
  onOk?: () => void;
}

export const P2PCreateProjectModal = ({
  visible,
  close,
  onOk,
}: ICreateProjectModal) => {
  const [form] = Form.useForm();

  const viewInstance = useModel(P2PCreateProjectService);
  const headerModel = useModel(HeaderModel);

  const projectName = Form.useWatch('projectName', form);
  const nodes = Form.useWatch('nodes', form);

  const { nodeId } = parse(window.location.search);

  React.useEffect(() => {
    if (visible && nodeId) {
      viewInstance.getNodeList(nodeId as string);
      // viewInstance.getNodeData(nodeId as string);
    }
  }, [nodeId, visible]);

  const handleClose = () => {
    close();
    viewInstance.loading = false;
  };

  const handleOk = () => {
    form.validateFields().then(async (value) => {
      // await viewInstance.createProject(value);
      // handleClose();
      // onOk && onOk();
    });
    history.push('/psi')
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
              [styles.buttonDisable]: !projectName ,
              // [styles.buttonDisable]: !projectName || !nodes || nodes.length < 1,  修改创建按钮状态
            })}
            loading={viewInstance.loading}
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
          initialValue={computeFuncList[1].type}
        >
          <SwitchCard cardList={computeFuncList} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
