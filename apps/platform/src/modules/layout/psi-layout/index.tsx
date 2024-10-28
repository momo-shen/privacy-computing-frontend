import styles from './index.less';
import React, {useState} from 'react';
import {Tabs, Form, Input, Button, Select, Upload, Spin, Typography, message} from 'antd';
import {getIp} from "@/services/PsiController";
import {useLocation} from "umi";
import {useModel} from "@/util/valtio-helper";
import {P2pProjectListService} from "@/modules/p2p-project-list/p2p-project-list.service";

const {Option} = Select;
const {Title} = Typography;

export const PsiLayout = () => {
  const location = useLocation();
  // @ts-ignore
  const {projectName} = location.state;
  const [activeTab, setActiveTab] = useState('1');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const senderId = localStorage.getItem('userId') || '';
  const p2pProjectService = useModel(P2pProjectListService);

  const handleAliceSubmit = async () => {
    setLoading(true);
    let jsonData = await form.validateFields();
    const senderIpRes = await getIp();
    let senderIp = senderIpRes.data;
    let psiProject: API.PsiProject = {
      projectName: projectName,
      senderId: senderId,
      senderIp: senderIp,
      senderPort: jsonData.senderPort,
      senderFilePath: jsonData.senderFilePath,
      senderInter: jsonData.senderInter,
      senderOutputPath: jsonData.senderOutputPath,
      receiverId: jsonData.receiverId,
      receiverIp: jsonData.receiverIp,
      receiverPort: jsonData.receiverPort,
      receiverFilePath: jsonData.receiverFilePath,
      receiverInter: jsonData.receiverInter,
      protocol: jsonData.protocol,
    };
    console.log(psiProject);
    p2pProjectService.createProject(psiProject).then(res => {
      message.info({
        type: 'success',
        content: '发送请求成功',
      });
    });
    setLoading(false);
   };

  return (
    <Spin spinning={loading}>
      <div className={styles.wrap}>
        <Title level={2} style={{textAlign: 'left', margin: '16px 0'}}>PSI - {projectName}</Title>
        <Tabs defaultActiveKey="1" onChange={(key) => setActiveTab(key)}>
          <Tabs.TabPane tab="传输设置" key="1">
            <Form layout="vertical" form={form}>
              <h3>本地设置</h3>
              <Form.Item name="senderPort" label="通信端口"
                         rules={[{required: true, message: '请输入通信端口'}]}>
                <Input placeholder="请输入通信端口"/>
              </Form.Item>
              <Form.Item name="protocol" label="使用协议"
                         rules={[{required: true, message: '请选择协议'}]}>
                <Select placeholder="请选择协议">
                  <Option value="bc22">BC22</Option>
                  <Option value="ecdh">ECDH</Option>
                  <Option value="kkrt">KKRT</Option>
                </Select>
              </Form.Item>

              <h3>网络设置</h3>
              <Form.Item name="receiverId" label="合作方ID"
                         rules={[{required: true, message: '请输入合作方ID'}]}>
                <Input placeholder="请输入合作方ID"/>
              </Form.Item>
              <Form.Item name="receiverIp" label="合作方IP地址"
                         rules={[{required: true, message: '请输入合作方IP地址'}]}>
                <Input placeholder="请输入合作方IP地址"/>
              </Form.Item>
              <Form.Item name="receiverPort" label="合作方监听端口"
                         rules={[{required: true, message: '请输入合作方监听端口'}]}>
                <Input placeholder="请输入合作方监听端口"/>
              </Form.Item>
            </Form>
          </Tabs.TabPane>

          <Tabs.TabPane tab="文件设置" key="2">
            <Form layout="vertical" form={form}>
              <h3>参与文件</h3>
              <Form.Item name="senderFilePath" label="文件路径"
                         rules={[{required: true, message: '请输入文件路径'}]}>
                <Input placeholder="请输入文件路径"/>
              </Form.Item>
              <Form.Item name="senderInter" label="求交列"
                         rules={[{required: true, message: '请输入求交列'}]}>
                <Input placeholder="请输入求交列"/>
              </Form.Item>

              <h3>求交设置</h3>
              <Form.Item name="receiverFilePath" label="合作方文件路径"
                         rules={[{required: true, message: '请输入合作方文件路径'}]}>
                 <Input placeholder="请输入合作方文件路径"/>
              </Form.Item>
              <Form.Item name="receiverInter" label="合作方求交列"
                         rules={[{required: true, message: '请输入合作方求交列'}]}>
                 <Input placeholder="请输入合作方求交列"/>
              </Form.Item>

              <h3>结果导出</h3>
              <Form.Item name="senderOutputPath" label="输出目录"
                rules={[{ required: true, message: '请输入输出目录路径' }]}
              >
                <Input placeholder="请输入输出目录路径"/>
              </Form.Item>
            </Form>

            {activeTab === '2' && (
              <Button type="primary" onClick={handleAliceSubmit} style={{marginBottom: 10}}>
                发送请求
              </Button>
            )}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Spin>
  );
};
