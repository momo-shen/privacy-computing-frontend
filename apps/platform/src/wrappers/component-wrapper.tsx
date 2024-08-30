/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { Outlet } from 'umi';

import { useModel } from '@/util/valtio-helper';

const ComponentWrapper = () => {

  return <Outlet />;
};

export default ComponentWrapper;
