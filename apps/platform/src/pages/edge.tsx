import Icon from '@ant-design/icons';
import { parse } from 'query-string';
import { useEffect } from 'react';
import { useLocation } from 'umi';

import { ReactComponent as CooperativeNode } from '@/assets/join-node.svg';
import { ReactComponent as projectManager } from '@/assets/project-manager.svg';
import { ReactComponent as ResultManager } from '@/assets/resultmanager.svg';
import { ReactComponent as Workbench } from '@/assets/workbench.svg';
import { CooperativeNodeListComponent } from '@/modules/cooperative-node-list';
import { HomeLayout } from '@/modules/layout/home-layout';
import { HomeLayoutService } from '@/modules/layout/home-layout/home-layout.service';
import { ManagementLayoutComponent } from '@/modules/layout/management-layout';
import { P2pProjectListComponent } from '@/modules/p2p-project-list';
import { P2PWorkbenchComponent } from '@/modules/p2p-workbench/workbench.view';
import { useModel } from '@/util/valtio-helper';

const menuItems: {
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  key: string;
}[] = [
  {
    label: '工作台',
    icon: <Icon component={Workbench} />,
    component: <P2PWorkbenchComponent />,
    key: 'workbench',
  },
  {
    label: '合作节点',
    icon: <Icon component={CooperativeNode} />,
    component: <CooperativeNodeListComponent />,
    key: 'connected-node',
  },
  {
    label: '我的项目',
    icon: <Icon component={projectManager} />,
    component: <P2pProjectListComponent />,
    key: 'my-project',
  }
];
const EdgePage = () => {
  const { search } = useLocation();
  const { nodeId } = parse(search);
  const homeLayoutService = useModel(HomeLayoutService);

  useEffect(() => {
    const getNodeList = async () => {
    };
    homeLayoutService.setSubTitle('Edge');
    getNodeList();
  }, []);
  return (
    <HomeLayout>
      <ManagementLayoutComponent menuItems={menuItems} defaultTabKey={'workbench'} />
    </HomeLayout>
  );
};

export default EdgePage;
