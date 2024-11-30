declare namespace API {
  interface User {
    id?: string;
    userId?: string;
    userPassword?: string;
  }

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
    projectId?: string;
    memberStatusId?: string;
    name?: string;
    owner?: string;
    member?: string;
    status?: string;
  }

  interface PriSqlMemberStatus {
    id?: string;
    projectId?: string;
    member?: string;
    status?: string
  }

  interface PriSqlDatatable {
    id?: string;
    projectId?: string;
    name?: string;
    refTableName?: string;
    owner?: string;
    connectionStr?: string;
  }

  interface PriSqlColumnAccess {
    id?: string;
    datatableId?: number;
    columnName?: string;
    columnDatatype?: string;
    member?: string;
    access?: string;
    rowId?: string;
  }

  interface PriSqlMyColumnAccess {
    id?: string;
    owner?: string;
    datatableName?: string;
    refTableName?: string;
    columnName?: string;
    access?: string;
    columnDatatype?: string;
  }
}