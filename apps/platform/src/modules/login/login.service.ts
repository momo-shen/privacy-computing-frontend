import { Model } from '@/util/valtio-helper';
import API from '@/services';

export class LoginService extends Model {
  userInfo: User | null = null;

  async login(user: API.User) {
    return await API.UserController.login(user);
  }

  getUserInfo = async () => {
    if (!this.userInfo) {
      const data = {
        userId: localStorage.getItem('userId'),
      };
      this.userInfo = data as User;
    }
    return this.userInfo;
  };
}

export interface User {
  userId: string;
}
export interface UserInfo {
  user: User | null;
}
