import {
  GlobalOutlined,
  ReadOutlined,
  BellOutlined,
  CaretDownOutlined,
  LogoutOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Empty, Popover, Space, Spin } from 'antd';
import classNames from 'classnames';
import { parse } from 'query-string';
import { useCallback, useEffect, useState } from 'react';
import { history, useLocation } from 'umi';

import centerOfflineImgLink from '@/assets/center-offline.png';
import centerImgLink from '@/assets/center.png';
import edgeOfflineImgLink from '@/assets/edge-offline.png';
import edgeImgLink from '@/assets/edge.png';
import Logo from '@/assets/logo.svg';
import fallbackLink from '@/assets/offline-user.png';
import { EdgeAuthWrapper } from '@/components/edge-wrapper-auth';
import { hasAccess, Platform } from '@/components/platform-wrapper';
import { LoginService } from '@/modules/login/login.service';
import platformConfig from '@/platform.config';
import { getImgLink } from '@/util/tracert-helper';
import { getModel, Model, useModel } from '@/util/valtio-helper';

import { HomeLayoutService } from './home-layout.service';
import styles from './index.less';

type IAvatarMapping = Record<
  Platform,
  {
    onlineLink: string;
    localLink: string;
    offlineLink: string;
    localStorageKey: string;
  }
>;

const avatarMapping: IAvatarMapping = {
  [Platform.CENTER]: {
    onlineLink: 'https://secretflow-public.oss-cn-hangzhou.aliyuncs.com/center.png',
    localLink: centerImgLink,
    offlineLink: centerOfflineImgLink,
    localStorageKey: 'secretpad-center',
  },
  [Platform.EDGE]: {
    onlineLink: 'https://secretflow-public.oss-cn-hangzhou.aliyuncs.com/edge.png',
    localLink: edgeImgLink,
    offlineLink: edgeOfflineImgLink,
    localStorageKey: 'secretpad-edge',
  },
  [Platform.AUTONOMY]: {
    onlineLink: 'https://secretflow-public.oss-cn-hangzhou.aliyuncs.com/autonomy.png',
    // autonomy 和 edge 头像相同
    localLink: edgeImgLink,
    offlineLink: edgeOfflineImgLink,
    localStorageKey: 'secretpad-autonomy',
  },
};

export const HeaderComponent = () => {
  const viewInstance = useModel(HeaderModel);
  const layoutService = useModel(HomeLayoutService);
  const loginService = useModel(LoginService);

  const { search, pathname } = useLocation();
  const { nodeId } = parse(search);

  const [avatarLink, setAvatarLink] = useState('');
  const [avatarOfflineLink, setAvatarOfflineLink] = useState('');

  const onLogout = () => {
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

    // 获取平台类型
    const platformType = loginService.userInfo.platformType;

    if (platformType) {
      // 如果是 CENTER / EDGE
      const avatarInfo = avatarMapping[platformType];
      setAvatarOfflineLink(avatarInfo.offlineLink);

      const imgLink = getImgLink(avatarInfo);
      setAvatarLink(imgLink);
    }
  }, [loginService?.userInfo]);

  return (
    <div className={styles['header-items']}>
      <div className={styles.left}>
        {
          <div
            className={classNames({
              [styles.logo]: hasAccess({ type: [Platform.AUTONOMY] }),
            })}
            onClick={() => {
              if (hasAccess({ type: [Platform.AUTONOMY] })) {
                history.push(`/edge?nodeId=${nodeId}&tab=workbench`);
              }
            }}
          >
            {platformConfig.header.logo ? platformConfig.header.logo : <Logo />}
          </div>
        }
        <span className={styles.subTitle}>{layoutService.subTitle}</span>
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
              <span className={styles.nodeName}>{viewInstance.nodeName}</span>
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
                // 用 icon 代替 Image 的 fallback
                // Antd: Avatar 组件中，可以设置 icon 或 children 作为图片加载失败的默认 fallback 行为.
                icon={<img width={'100%'} src={avatarOfflineLink || fallbackLink} />}
                src={avatarLink || null}
              />
              {loginService?.userInfo?.name}
              <CaretDownOutlined />
            </Space>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export class HeaderModel extends Model {
  homeLayoutService = getModel(HomeLayoutService);

  nodeName = '';

  showChangePasswordModel = false;

  goto(url: string) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.click();
  }

  showGoToHome = (path: string) => {
    return path.startsWith('/node');
  };

  showMyNode = (path: string) => {
    const pathnameToShowNode = ['/node', '/message', '/edge'];
    return pathnameToShowNode.indexOf(path) > -1;
  };
}
