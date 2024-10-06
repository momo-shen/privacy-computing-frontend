import {HomeLayout} from "@/modules/layout/home-layout";
import {ManagementLayoutComponent} from "@/modules/layout/management-layout";
import {UserManagement} from "@/modules/prisql/user-management";
import {DatatableSetting} from "@/modules/prisql/datatable-setting";
import {SqlQuery} from "@/modules/prisql/sql-query";
import {MyAccess} from "@/modules/prisql/my-access";

const menuItems: {
  label: string;
  component: React.ReactNode;
  key: string;
}[] = [
  {
    label: '用户管理',
    component: <UserManagement />,
    key: 'user-management',
  },
  {
    label: '数据表设置',
    component: <DatatableSetting />,
    key: 'datatable-setting',
  },
  {
    label: 'Sql查询',
    component: <SqlQuery />,
    key: 'sql-query',
  },
  {
    label: '我的权限',
    component: <MyAccess />,
    key: 'my-access',
  }
];

const PsiPage = () => {
  return (
      <HomeLayout>
        <ManagementLayoutComponent menuItems={menuItems} defaultTabKey={'user-management'} />
      </HomeLayout>
  );
};

export default PsiPage;
