import { Form, Input, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from '@/util/valtio-helper';

import { CooperativeNodeService } from './cooperative-node.service';
import { getProtocol, replaceProtocol, SelectBefore } from './slectBefore';

export const EditCooperativeNodeModal = ({
  open,
  onClose,
  data,
  onOk,
}: {
  open: boolean;
  onClose: () => void;
  data: API.NodeRouterVO;
  onOk: () => void;
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [serviceType, setServiceType] = useState('http://');

  const service = useModel(CooperativeNodeService);
  const [form] = Form.useForm();
  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        address: replaceProtocol(data.srcNetAddress)
      });
      const protocol = getProtocol(data.srcNetAddress, data?.srcNode?.protocol,
      );
      setServiceType(protocol);
    }
  }, [data, open]);

  const handleOk = () => {
    form.validateFields().then(async (value) => {
      const { status } = await service.editCooperativeNode({
        routerId: data.routeId,
        dstNetAddress:
            `${getProtocol(
              data?.dstNode?.netAddress,
              data?.dstNode?.protocol,
            )}${replaceProtocol(data?.dstNode?.netAddress)}`,
        srcNetAddress:
            `${serviceType}${value.address}`,
        routeType: data.routeType,
      });
      if (status && status.code !== 0) {
        messageApi.error(status.msg);
        return;
      }
      onOk();
      messageApi.success(`编辑成功！`);
      onClose();
    });
  };

  return (
    <>
      <Modal title="编辑" open={open} onOk={handleOk} onCancel={onClose}>
        <Form form={form} requiredMark="optional" layout="vertical">
          <Form.Item
            name={'address'}
            label={'合作节点通讯地址'}
            rules={[
              {
                required: true,
                message: `请输入合作节点通讯地址`,
              },
              {
                pattern:
                  /^.{1,50}:([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
                message: `请输入正确的合作节点通讯地址`,
              },
            ]}
          >
            <Input
              addonBefore={
                <SelectBefore serviceType={serviceType} onChange={setServiceType} />
              }
            />
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </>
  );
};
