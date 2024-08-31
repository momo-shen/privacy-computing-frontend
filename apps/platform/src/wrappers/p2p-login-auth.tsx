import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'umi';

import { LoginService } from '@/modules/login/login.service';
import { useModel } from '@/util/valtio-helper';

/**
 * 判断 platformType === AUTONOMY
 */
const P2pLoginAuth = () => {
  const loginService = useModel(LoginService);
  const [canOutlet, setCanOutlet] = useState(true);

  const getUserInfo = async () => {
    await loginService.getUserInfo();
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (canOutlet) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default P2pLoginAuth;
