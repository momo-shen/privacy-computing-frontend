import { message } from 'antd';
import React from 'react';
import { history } from 'umi';

import { ReactComponent as Logo } from '@/assets/logo.svg';
import { getModel, Model, useModel } from '@/util/valtio-helper';

import { LoginForm } from './component/login-form';
import type { UserInfo } from './component/login-form';
import styles from './index.less';
import type { User } from './login.service';
import { LoginService } from './login.service';

export const LoginComponent: React.FC = () => {
  const loginModel = useModel(LoginModel);
  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <Logo />
      </div>
      <div className={styles.right}>
        <LoginForm onConfirm={loginModel.loginConfirm} />
      </div>
    </div>
  );
};

export class LoginModel extends Model {
  loginService = getModel(LoginService);

  loginConfirm = async (loginFields: UserInfo) => {
    let user: API.User = {
      userId: loginFields.name,
      userPassword: loginFields.password,
    };
    const result = await this.loginService.login(user);
    const resJson = JSON.parse(JSON.stringify(result));

    this.loginService.userInfo = result.data as User;
    if (resJson.status === "success") {
      if (this.loginService.userInfo.userId) {
        localStorage.setItem('neverLogined', 'true');
        localStorage.setItem('userId', this.loginService.userInfo.userId);
        history.push(`/home?nodeId=${this.loginService.userInfo.userId}`);
        message.success('登录成功');
        return;
      }
      message.success('登录成功');
    } else {
      message.error('登录失败，请检查用户名或密码');
    }
  };
}
