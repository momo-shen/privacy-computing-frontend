import { CloseOutlined } from '@ant-design/icons';
import { Alert, Button, Drawer, Form, Input, message, Select, Space } from 'antd';
import type { ValidateStatus } from 'antd/es/form/FormItem';
import { parse } from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, history } from 'umi';

import { useModel } from '@/util/valtio-helper';


import { CooperativeNodeService } from './cooperative-node.service';

import { SelectBefore, getProtocol, replaceProtocol } from './slectBefore';
import styles from './index.less';

export const AddCooperativeNodeDrawer = ({
  open,
  onClose,
  onOk,
}: {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
}) => {
  const service = useModel(CooperativeNodeService);

  const { computeNodeList, computeNodeLoading } = service;
  const [messageApi, contextHolder] = message.useMessage();
  const [submittable, setSubmittable] = useState(false);
  const [serviceType, setServiceType] = useState('http://');
  const [cooperativeServiceType, setCooperativeServiceType] = useState('http://');

  const [form] = Form.useForm();

  const computeNodeId = Form.useWatch(['cooperativeNode', 'computeNodeName'], form);
  const verifyCodeValue = Form.useWatch('verifyCode', form);
  // Watch all values
  const values = Form.useWatch([], form);

  const { search } = useLocation();
  const { nodeId } = parse(search);

  useEffect(() => {
    if (service.nodeInfo.netAddress) {
      setServiceType(getProtocol(service.nodeInfo.netAddress));
    }
  }, [service.nodeInfo.netAddress]);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  useEffect(() => {
    form.setFieldValue(['cooperativeNode', 'computeControlNodeId'], 'master');
  }, [computeNodeId]);

  useEffect(() => {
    service.getNodeInfo();
  }, []);

  const handleOk = () => {
  };

  const handleClose = () => {
    form.resetFields();
    setServiceType('http://');
    setCooperativeServiceType('http://');
    onClose();
  };

  const [verifyCodeStatus, setVerifyCodeStatus] = useState<ValidateStatus>('');
  const [verifyCodeHelp, setVerifyCodeHelp] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!verifyCodeValue) {
      setVerifyCodeStatus('');
      setVerifyCodeHelp('');
      setShowAlert(false);
    }
  }, [verifyCodeValue]);

  const handleParseVerifyCode = () => {
    try {
      const base64String = atob(verifyCodeValue);
      const jsonObj = JSON.parse(base64String);
      // 全部解析出值才算成功
      if (
        jsonObj.certText &&
        jsonObj.dstNodeId &&
        jsonObj.name &&
        jsonObj.dstNetAddress
      ) {
        const protocol = getProtocol(jsonObj.dstNetAddress);
        setCooperativeServiceType(protocol);
        form.setFieldsValue({
          cooperativeNode: {
            cert: jsonObj.certText,
            computeNodeId: jsonObj.dstNodeId,
            computeNodeName: jsonObj.name,
            nodeAddress: replaceProtocol(jsonObj.dstNetAddress),
          },
        });
        setShowAlert(true);
        setVerifyCodeStatus('');
        setVerifyCodeHelp('');
      } else {
        throw new Error('');
      }
    } catch (error) {
      setVerifyCodeStatus('error');
      setVerifyCodeHelp('无法解析，请确认输入的认证码是否正确');
      setShowAlert(false);
    }
  };

  return (
    <>
      <Drawer
        title="添加合作节点"
        placement="right"
        onClose={handleClose}
        destroyOnClose
        open={open}
        closable={false}
        width={560}
        className={styles.addCooperativeNodeDrawer}
        extra={
          <CloseOutlined
            style={{ fontSize: 12 }}
            onClick={() => {
              handleClose();
            }}
          />
        }
        footer={
          <Space style={{ float: 'right' }}>
            <Button onClick={handleClose}>取消</Button>
            <Button disabled={!submittable} type="primary" onClick={handleOk}>
              确定
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <div className={styles.subTitle}>合作节点</div>
          <div className={styles.formGroup}>
            <Form.Item
                name={'verifyCode'}
                className={styles.verifyCodeForm}
                validateStatus={verifyCodeStatus}
                help={verifyCodeHelp}
                label={
                  <div className={styles.verifyCodeCode}>
                    <div className={styles.tips}>节点认证码 (可选)</div>
                    <Button
                        disabled={!verifyCodeValue}
                        type="link"
                        className={styles.linkTips}
                        onClick={handleParseVerifyCode}
                    >
                      识别解析
                    </Button>
                  </div>
                }
            >
              <Input.TextArea
                  rows={4}
                  placeholder="请输入合作方认证码，识别解析后可自动填充合作节点信息"
              />
            </Form.Item>
            {showAlert && (
                <Alert
                    showIcon
                    message="认证码识别成功，节点信息已为你自动填充，建议不要手动修改"
                    type="success"
                    style={{marginBottom: 8}}
                />
            )}
            <Form.Item
                name={['cooperativeNode', 'computeControlNodeId']}
                label={'管控节点ID'}
            >
              <Input placeholder="选择计算节点后自动填充" disabled></Input>
            </Form.Item>
            <Form.Item
                name={['cooperativeNode', 'computeNodeName']}
                label={'计算节点名'}
                rules={[
                  {
                    required: true,
                    message: '请输入'
                  },
                ]}
            >
              <Input placeholder="请输入计算节点名"/>
            </Form.Item>
            <Form.Item
                name={['cooperativeNode', 'computeNodeId']}
                label={'计算节点ID'}
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
            >
              <Input placeholder="请输入计算节点ID"/>
            </Form.Item>
            <Form.Item
                name={['cooperativeNode', 'nodeAddress']}
                label={'节点通讯地址'}
                rules={[
                  {required: true, message: '请输入通讯地址'},
                  {
                    pattern:
                        /^.{1,50}:([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
                    message: '请输入正确的通讯地址',
                  },
                ]}
            >
              <Input
                  placeholder="127.0.0.1"
                  addonBefore={
                    <SelectBefore
                        serviceType={cooperativeServiceType}
                        onChange={setCooperativeServiceType}
                    />
                  }
              ></Input>
            </Form.Item>
            <Form.Item
                rules={[{required: true, message: '请输入节点公钥'}]}
                name={['cooperativeNode', 'cert']}
                label={'节点公钥'}
            >
              <Input.TextArea placeholder="请输入"/>
            </Form.Item>
          </div>
          <div className={styles.subTitle}>本方节点</div>
          <div className={styles.formGroup}>
            <Form.Item
              name={['selfNode', 'nodeAddress']}
              label={'节点通讯地址'}
              rules={[
                { required: true, message: '请输入通讯地址' },
                {
                  pattern:
                    /^.{1,50}:([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
                  message: '请输入正确的通讯地址',
                },
              ]}
              initialValue={replaceProtocol(service.nodeInfo.netAddress)}
            >
              <Input
                addonBefore={
                  <SelectBefore serviceType={serviceType} onChange={setServiceType} />
                }
                placeholder="请输入通讯地址"
              ></Input>
            </Form.Item>
          </div>
        </Form>
      </Drawer>
      {contextHolder}
    </>
  );
};
