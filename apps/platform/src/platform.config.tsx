import { ReactComponent as Logo } from '@/assets/logo.svg';

export default {
  theme: {
    token: {
      colorPrimary: '#0068fa',
    },
  },
  header: {
    logo: <Logo />, // 左上角Logo React Component
    rightLinks: true, // boolean | React Component
  }
};
