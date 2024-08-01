import P2pMpcImg from '@/assets/p2p-mpc.svg';
// import P2pAllImg from '@/assets/p2p-all.svg';
import P2pPsiImg from '@/assets/p2p-psi.svg';

export enum ProjectType {
  'DAG' = 'DAG',
  'PSI' = 'PSI',
  'ALL' = 'ALL',
}

export const computeFuncList = [
  {
    type: ProjectType.DAG,
    name: 'PriSal',
    description: '使得可以在多个部门数据间执行安全的数据查询而不会泄露各部门私有数据',
    minimap: P2pMpcImg,
  },
  {
    type: ProjectType.PSI,
    name: '隐私求交',
    description: '支持轻量交互，获取双方数据交集',
    minimap: P2pPsiImg,
  },
  // {
  //   type: ProjectType.ALL,
  //   name: '全家桶',
  //   description: '同时支持模型训练和隐私求交，根据业务复杂度选择不同的计算功能',
  //   minimap: P2pAllImg,
  // },
];
