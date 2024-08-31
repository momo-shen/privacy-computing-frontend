declare namespace API {
  interface PsiReqeust {
    id?: number;
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
}