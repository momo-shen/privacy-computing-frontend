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
      ownerId: loginField.name,
    };
    localStorage.setItem('ownerId', loginField.name);
    return { status, data };
  }

  getUserInfo = async () => {
    if (!this.userInfo) {
      const data = {
        token: "token",
        ownerId: localStorage.getItem('ownerId'),
      };
      this.userInfo = data as User;
    }
    return this.userInfo;
  };
}

export interface User {
  token: string;
  ownerId: string; // 	NODE的话这里存nodeId
}
export interface UserInfo {
  user: User | null;
}
