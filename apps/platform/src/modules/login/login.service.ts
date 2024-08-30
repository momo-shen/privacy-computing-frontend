import sha256 from 'crypto-js/sha256';

import type { PadMode, Platform } from '@/components/platform-wrapper';
import { Model } from '@/util/valtio-helper';

// import Base64 from 'crypto-js/enc-base64';
// import sha256 from 'crypto-js/256';

// console.log(Base64.stringify(sha256('message')));

export class LoginService extends Model {
  userInfo: User | null = null;

  async login(loginField: { name: string; password: string }) {

  }

  getUserInfo = async () => {

  };

  getUserInfoAsync = async () => {

  };

  resetUserPwd = async (
    name: string,
    currentPwd: string,
    newPwd: string,
    verifiedNewPwd: string,
  ) => {

  }
}

export interface User {
  token: string;
  platformType: Platform; // 'EDGE' | 'CENTER' | 'AUTONOMY';
  name: string;
  ownerType: 'CENTER' | 'EDGE'; // 宿主类型
  ownerId: string; // 	NODE的话这里存nodeId
  deployMode: PadMode; // 'ALL-IN-ONE' | 'MPC' | 'TEE';
}
export interface UserInfo {
  user: User | null;
}
