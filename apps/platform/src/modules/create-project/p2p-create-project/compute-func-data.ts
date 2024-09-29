import P2pMpcImg from '@/assets/p2p-mpc.svg';
import P2pPsiImg from '@/assets/p2p-psi.svg';

export enum ProjectType {
  'PSQL' = 'PSQL',
  'PSI' = 'PSI'
}

export const computeFuncList = [
  {
    type: ProjectType.PSI,
    name: '隐私求交',
    description: '支持轻量交互，获取双方数据交集',
    minimap: P2pPsiImg,
  },
  {
    type: ProjectType.PSQL,
    name: 'PriSQL',
    description: '在多个部门数据间执行安全的数据查询而不泄露各部门私有数据',
    minimap: P2pMpcImg,
  }
];
