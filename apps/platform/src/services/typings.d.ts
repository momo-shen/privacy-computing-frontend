declare namespace API {
  interface PsiProject {
    id?: string;
    projectName?: string;
    senderId?: string;
    senderIp?: string;
    senderPort?: string;
    senderFilePath?: string;
    senderInter?: string;
    senderOutputPath?: string;
    receiverId?: string;
    receiverIp?: string;
    receiverPort?: string;
    receiverFilePath?: string;
    receiverInter?: string;
    receiverOutputPath?: string;
    protocol?: string;
    status?: string;
    createTime?: Date;
  }

  interface PriSqlProject {
    id?: string;
    projectName?: string;
    owner?: string;
    members?: string[];
  }
}