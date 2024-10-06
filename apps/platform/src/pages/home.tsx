import Icon from '@ant-design/icons';

import { ReactComponent as projectManager } from '@/assets/project-manager.svg';
import { ReactComponent as Workbench } from '@/assets/workbench.svg';
import { HomeLayout } from '@/modules/layout/home-layout';
import { ManagementLayoutComponent } from '@/modules/layout/management-layout';
import { P2pProjectListComponent } from '@/modules/p2p-project-list';
import { P2PWorkbenchComponent } from '@/modules/p2p-workbench/workbench.view';

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
    label: '我的项目',
    icon: <Icon component={projectManager} />,
    component: <P2pProjectListComponent />,
    key: 'my-project',
  }
];
const HomePage = () => {
  return (
    <HomeLayout>
      <ManagementLayoutComponent menuItems={menuItems} defaultTabKey={'workbench'} />
    </HomeLayout>
  );
};

export default HomePage;
