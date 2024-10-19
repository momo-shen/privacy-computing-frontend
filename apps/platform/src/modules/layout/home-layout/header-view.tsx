import {
  CaretDownOutlined,
  LogoutOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Space } from 'antd';
import { parse } from 'query-string';
import { useEffect } from 'react';
import { history, useLocation } from 'umi';

import edgeImgLink from '@/assets/edge.png';
import Logo from '@/assets/logo.svg';
import { LoginService } from '@/modules/login/login.service';
import platformConfig from '@/platform.config';
import { Model, useModel } from '@/util/valtio-helper';

import styles from './index.less';

export const HeaderComponent = () => {
  const viewInstance = useModel(HeaderModel);
  const loginService = useModel(LoginService);

  const { search, pathname } = useLocation();
  const { nodeId } = parse(search);

  const userId = localStorage.getItem('userId');

  const onLogout = () => {
    localStorage.removeItem('userId');
    history.push('/login');
  };

  const items = [
    {
      key: 'logout',
      icon: <LogoutOutlined onClick={onLogout} />,
      label: <div onClick={onLogout}>退出</div>,
    },
  ];

  useEffect(() => {
    if (!loginService?.userInfo) return;
  }, [loginService?.userInfo]);

  return (
    <div className={styles['header-items']}>
      <div className={styles.left}>
        {
          <div
            className={styles.logo}
            onClick={() => {
              history.push(`/home?nodeId=${nodeId}&tab=workbench`);
            }}
          >
            {platformConfig.header.logo ? platformConfig.header.logo : <Logo />}
          </div>
        }
        {viewInstance.showMyNode(pathname) && (
          <>
            <span className={styles.line} />
            <div
              className={styles.myNodeTitle}
              onClick={() =>
                history.push({
                  pathname: '/my-node',
                  search: `nodeId=${nodeId}`,
                })
              }
            >
              <DatabaseOutlined />
              <span className={styles.nodeName}>{userId}</span>
              节点
            </div>
          </>
        )}
      </div>
      <div className={styles.right}>
        {<>{platformConfig.header.rightLinks}</>}
        <span className={styles.loginline} />
        <Dropdown
          menu={{
            items,
          }}
        >
          <div style={{ cursor: 'pointer' }} onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar
                size={28}
                src={edgeImgLink}
              />
              {userId}
              <CaretDownOutlined />
            </Space>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export class HeaderModel extends Model {
  showMyNode = (path: string) => {
    const pathnameToShowNode = ['/home'];
    return pathnameToShowNode.indexOf(path) > -1;
  };
}
