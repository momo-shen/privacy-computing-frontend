import API from '@/services';
import {Model} from "@/util/valtio-helper";

export class UserManagementService extends Model{
  memberStatusList: API.PriSqlMemberStatus[] = [];
  displayMemberStatusList: API.PriSqlMemberStatus[] = [];
  loading = false;

  getMemberStatusList = async (projectId: string) => {
    this.loading = true;
    const response = await API.PriSqlController.getMemberStatusList(projectId);
    const data = response.data;
    this.memberStatusList = data || [];
    this.loading = false;
    this.displayMemberStatusList = this.memberStatusList;
    return this.memberStatusList;
  }

  inviteMember = async (projectId: string, member: string) => {
    this.loading = true;
    const response = await API.PriSqlController.inviteMember(projectId, member);
    const data = response.data;
    await this.getMemberStatusList(projectId);
    this.loading = false;
    return data;
  }
}