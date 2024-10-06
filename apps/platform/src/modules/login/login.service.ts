import sha256 from 'crypto-js/sha256';

import { Model } from '@/util/valtio-helper';

// import Base64 from 'crypto-js/enc-base64';
// import sha256 from 'crypto-js/256';

// console.log(Base64.stringify(sha256('message')));

export class LoginService extends Model {
  userInfo: User | null = null;

  async login(loginField: { name: string; password: string }) {
    const status = {
      code: 0,
      msg: ""
    };
    const data = {
      token: "token",
      userId: loginField.name,
    };
    localStorage.setItem('userId', loginField.name);
    return { status, data };
  }

  getUserInfo = async () => {
    if (!this.userInfo) {
      const data = {
        token: "token",
        userId: localStorage.getItem('userId'),
      };
      this.userInfo = data as User;
    }
    return this.userInfo;
  };
}

export interface User {
  token: string;
  userId: string;
}
export interface UserInfo {
  user: User | null;
}
