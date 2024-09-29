import styles from './index.less';
import React, {useState} from 'react';
import {Spin, Typography} from 'antd';

const {Title} = Typography;

export const PrisqlLayout = () => {

  const [loading, setLoading] = useState(false);

  return (
    <Spin spinning={loading}>
      <div className={styles.wrap}>
        <Title level={2} style={{textAlign: 'left', margin: '16px 0'}}>PriSql</Title>
        prisql
      </div>
    </Spin>
  );
};
