import styles from './index.less';
import React, {useState, useEffect} from 'react';
import {Tabs, Form, Input, Button, Select, Upload, message, Spin, Modal, Typography} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
// import axios from 'axios';

const {TabPane} = Tabs;
const {Option} = Select;
const {Title} = Typography;

// 模拟API接口
const apiEndpoints = {
  getPartners: '/api/partners', // 获取合作方节点
  getFiles: (id: string) => `/api/files/${id}`, // 获取文件列表
  getFileColumns: (fileId: string) => `/api/files/${fileId}/columns`, // 获取某个文件的所有列
  uploadFile: '/api/upload', // 上传文件
  sendConfiguration: '/api/psi', // 发送PSI请求
};

const mockedPartners = [
  {id: 1, name: '节点1', ip: '127.0.0.1', port: '8012'},
  {id: 2, name: '节点2', ip: '127.0.0.1', port: '8011'}
];

const mockedFiles = [
  {id: 1, name: '文件1'},
  {id: 2, name: '文件2'}
];

const mockedPartnerFiles = [
  {id: 3, name: '文件3'},
  {id: 4, name: '文件4'}
];

const mockedLocalFileColumns = [
  'fruit'
];

const mockedPartnerFileColumns = [
  'fruit'
];

export const PsiLayout = () => {
  const id = 1;
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null); // 存储选中文件ID
  const [uploadedFile, setUploadedFile] = useState<any>(null); // 存储上传文件信息
  const [partnerFiles, setPartnerFiles] = useState([]);
  const [localFileColumns, setLocalFileColumns] = useState([]);
  const [selectedLocalFileColumn, setSelectedLocalFileColumn] = useState(null);
  const [partnerFileColumns, setPartnerFileColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileOption, setFileOption] = useState<'select' | 'upload' | null>(null);
  const [outputDirectory, setOutputDirectory] = useState<string>(''); // 存储输出目录

  useEffect(() => {
    // 获取合作方节点/获取文件列表
    const fetchData = async () => {
      try {
        // const [partnersResponse, filesResponse] = await Promise.all([
        //   axios.get(apiEndpoints.getPartners),
        //   axios.get(apiEndpoints.getFiles(id)),
        // ]);
        // setPartners(partnersResponse.data);
        // setFiles(filesResponse.data);
        setPartners(mockedPartners);
        setFiles(mockedFiles);
      } catch (error) {
        message.error('获取数据失败');
      }
    };
    fetchData();
  }, []);

  const handlePartnerChange = async (partnerId: string) => {
    // 获取合作方节点详细信息并更新表单
    const partner = partners.find((partner: any) => partner.id === partnerId);
    setSelectedPartner(partner);
    form.setFieldsValue({
      partnerName: partner?.name,
      partnerId: partner?.id,
      partnerIp: partner?.ip,
      partnerPort: partner?.port,
    });
    // const partnerFilesResponse = await axios.get(apiEndpoints.getFiles(partner.id)); // 获取合作方文件
    // setPartnerFiles(partnerFilesResponse);
    setPartnerFiles(mockedPartnerFiles);
  };

  const handleLocalFileChange = async (fileId: string) => {
    if (fileOption === 'upload') {
      message.error('请先删除上传的文件后再选择文件');
      return;
    }
    setFileOption('select'); // 使上传文件失效
    setSelectedFile(fileId);
    // 获取本地文件列
    try {
      // const response = await axios.get(apiEndpoints.getFileColumns(fileId));
      // setLocalFileColumns(response.data.columns);
      setLocalFileColumns(mockedLocalFileColumns);
    } catch (error) {
      message.error('获取文件列失败');
    }
  };

  const handlePartnerFileChange = (partnerFiles) => {
    setPartnerFiles(partnerFiles);
  };


  const handlePartnerFileColumns = (partnerFileColumns) => {
    setPartnerFileColumns(partnerFileColumns);
  };

  // const handlePartnerFileChange = async (fileId: string) => {
  //   // 获取合作方文件列
  //   try {
  //     // const response = await axios.get(apiEndpoints.getFileColumns(fileId));
  //     // setPartnerFileColumns(response.data.columns);
  //     //setPartnerFileColumns(mockedPartnerFileColumns);
  //   } catch (error) {
  //     message.error('获取合作方文件列失败');
  //   }
  // };

  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options;
    if (fileOption === 'select') {
      message.error('请先删除文件选择后再上传文件');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      // 这里我们使用JavaScript的split方法来解析CSV文件
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const rows = content.split('\n');
        const columns = rows[0].split(','); // 假设第一行是列标题
        setLocalFileColumns(columns);
        form.setFieldsValue({ localFileColumnSelect: undefined });
        onSuccess('文件上传成功');
        message.success('文件上传成功');
      };
      reader.readAsText(file);
    } catch (error) {
      onError('文件上传失败');
      message.error('文件上传失败');
    }
   };

  // const handleUpload = async (options: any) => {
  //   const {file, onSuccess, onError} = options;
  //   if (fileOption === 'select') {
  //     message.error('请先删除文件选择后再上传文件');
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     // const response = await axios.post(apiEndpoints.uploadFile, formData, {
  //     //   headers: {
  //     //     'Content-Type': 'multipart/form-data',
  //     //   },
  //     // });
  //     //
  //     setFileOption('upload'); // 使文件选择失效
  //     setUploadedFile(file);
  //     // setLocalFileColumns(response.data.columns);
  //     setLocalFileColumns(mockedLocalFileColumns);
  //     form.setFieldsValue({ localFileColumnSelect: undefined });
  //     onSuccess('文件上传成功');
  //     message.success('文件上传成功');
  //   } catch (error) {
  //     onError('文件上传失败');
  //     message.error('文件上传失败');
  //   }
  // };

  const handleClearSelection = () => {
    setFileOption(null); // 重置option使得能够再次选择文件
    setSelectedFile(null);
    setLocalFileColumns([]);
    setUploadedFile(null);
    setSelectedLocalFileColumn(null);
    form.resetFields(['localFileSelect', 'localFileColumnSelect']);
    message.success('已删除选择或上传的文件');
  };


  const handleDirectorySelect = (directoryPath) => {
    setOutputDirectory(directoryPath);
  };

  const [socketAlice, setSocketAlice] = useState(null);
  const [socketBob, setSocketBob] = useState(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    const ws_alice = new WebSocket('ws://127.0.0.1:7000/ws');
    const ws_bob = new WebSocket('ws://127.0.0.1:7001/ws');

    ws_alice.onopen = () => {
      console.log('Connected to WebSocket server');
    };
    ws_bob.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws_alice.onmessage = (event) => {
      console.log('Received message from server:', event.data);
      setResult(event.data);
    };
    ws_bob.onmessage = (event) => {
      console.log('Received message from server:', event.data);
      setResult(event.data);
    };

    ws_alice.onclose = () => {
      console.log('WebSocket connection closed');
    };
    ws_bob.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocketAlice(ws_alice);
    setSocketBob(ws_bob);

    return () => {
      ws_alice.close();
      ws_bob.close();
    };
  }, []);

  const handleAliceSubmit = async () => {
    setLoading(true);
    let jsonData = await form.validateFields();
    jsonData['rule'] = '0';
    jsonData['curve'] = 'SECP256k1';
    jsonData['localFileSelect'] = 'D:/post_graduate/phase0/project/test/set_a.csv';
    console.log(jsonData);
    if (socketAlice && socketAlice.readyState === WebSocket.OPEN) {
      socketAlice.send(JSON.stringify(jsonData));
    }
    setLoading(false);
  };

  const handleBobSubmit = async () => {
      setLoading(true);
      let jsonData = await form.validateFields();
      jsonData['rule'] = '1';
      jsonData['curve'] = 'SECP256k1';
      jsonData['localFileSelect'] = 'D:/post_graduate/phase0/project/test/set_b.csv';
      console.log(jsonData);
      if (socketBob && socketBob.readyState === WebSocket.OPEN) {
        socketBob.send(JSON.stringify(jsonData));
      }
      setLoading(false);
  };

  return (
    <Spin spinning={loading}>
      <div className={styles.wrap}>
        <Title level={2} style={{textAlign: 'left', margin: '16px 0'}}>PSI</Title>
        <Tabs defaultActiveKey="1" onChange={(key) => setActiveTab(key)}>
          <TabPane tab="传输设置" key="1">
            <Form layout="vertical" form={form}>
              <h3>本地设置</h3>
              <Form.Item name="localPort" label="通信端口"
                         rules={[{required: true, message: '请输入通信端口'}]}>
                <Input placeholder="请输入通信端口"/>
              </Form.Item>
              <Form.Item name="localName" label="本地名称"
                         rules={[{required: true, message: '请输入本地名称'}]}>
                <Input placeholder="请输入本地名称"/>
              </Form.Item>
              <Form.Item name="localId" label="本地ID"
                         rules={[{required: true, message: '请输入本地ID'}]}>
                <Input placeholder="请输入本地ID"/>
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
              <Form.Item name="partnerSelect" label="合作节点选择"
                         rules={[{required: true, message: '请选择合作节点'}]}>
                <Select placeholder="请选择合作节点" onChange={handlePartnerChange}>
                  {partners.map((partner: any) => (
                    <Option key={partner.id} value={partner.id}>
                      {partner.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="partnerName" label="合作方角色名称">
                <Input readOnly/>
              </Form.Item>
              <Form.Item name="partnerId" label="合作方ID">
                <Input readOnly/>
              </Form.Item>
              <Form.Item name="partnerIp" label="合作方IP地址">
                <Input readOnly/>
              </Form.Item>
              <Form.Item name="partnerPort" label="合作方监听端口">
                <Input readOnly/>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="文件设置" key="2">
            <Form layout="vertical" form={form}>
              <h3>参与文件</h3>
              <Form.Item name="localFileSelect" label="选择文件"
                         rules={[{required: fileOption === 'select', message: '请选择文件'}]}>
                <Select placeholder="请选择文件" onChange={handleLocalFileChange}
                        value={selectedFile} disabled={fileOption === 'upload'}>
                  {files.map((file: any) => (
                    <Option key={file.id} value={file.id}>
                      {file.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="localUpload" label="本地上传"
                         rules={[{required: fileOption === 'upload', message: '请上传文件'}]}>
                <Upload customRequest={handleUpload} showUploadList={false}
                        disabled={fileOption === 'select'}>
                  <Button icon={<UploadOutlined/>} disabled={fileOption === 'select'}>
                    上传文件
                  </Button>
                </Upload>
                {uploadedFile && (
                <div style={{marginTop: 8}}>
                  <span>{uploadedFile.name}</span>
                </div>
                )}
              </Form.Item>
              {fileOption && (
                <Button
                  type="link"
                  onClick={handleClearSelection}
                >
                  清除选择
                </Button>
              )}
              <Form.Item name="localFileColumnSelect" label="求交列选择"
                         rules={[{required: true, message: '请选择列'}]}>
                 <Select placeholder="请选择列" onChange={setSelectedLocalFileColumn}>
                {localFileColumns.map((column: string) => (
                  <Option key={column} value={column}>
                    {column}
                  </Option>
                ))}
              </Select>
              </Form.Item>

              <h3>求交设置</h3>
              <Form.Item name="partnerFileSelect" label="合作方文件选择"
                         rules={[{required: true, message: '请选择合作方文件'}]}>
                {/* <Select placeholder="请选择合作方文件" onChange={handlePartnerFileChange}>
                  {partnerFiles.map((file: any) => (
                    <Option key={file.id} value={file.id}>
                      {file.name}
                    </Option>
                  ))}
                </Select> */}
                 <Input placeholder="请输入合作方文件" onChange={handlePartnerFileChange} />
              </Form.Item>
              <Form.Item name="partnerFileColumnSelect" label="合作方求交列选择"
                         rules={[{required: true, message: '请选择列'}]}>
                {/* <Select placeholder="请选择列">
                  {partnerFileColumns.map((column: string) => (
                    <Option key={column} value={column}>
                      {column}
                    </Option>
                  ))}
                </Select> */}
                 <Input placeholder="请输入合作方求交列" onChange={handlePartnerFileColumns} />

              </Form.Item>

              <h3>结果导出</h3>
              <Form.Item
                name="outputDirectory"
                label="输出目录"
                rules={[{ required: true, message: '请输入输出目录路径' }]}
              >
                <Input placeholder="请输入输出目录路径" onChange={handleDirectorySelect} />
              </Form.Item>
            </Form>

            {activeTab === '2' && (
              <Button type="primary" onClick={handleAliceSubmit} style={{marginBottom: 10}}>
                给Alice发送请求
              </Button>
            )}
            {activeTab === '2' && (
              <Button type="primary" onClick={handleBobSubmit} style={{marginBottom: 10}}>
                给Bob发送请求
              </Button>
            )}
          </TabPane>
        </Tabs>
        {activeTab === '2' && (<div>Result: {result}</div>)}
      </div>
    </Spin>
  );
};
