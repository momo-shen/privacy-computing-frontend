import API from '@/services';
import {Model} from "@/util/valtio-helper";

export class MyAccessService extends Model {
  myAccessList: API.PriSqlMyColumnAccess[] = [];
  displayMyAccessList: API.PriSqlMyColumnAccess[] = [];
  loading = false;

  getMyAccessList = async (projectId: number, member: string) => {
    this.loading = true;
    const response = await API.PriSqlController.getMyAccessList(projectId, member);
    const data = response.data;
    this.myAccessList = data || [];
    this.loading = false;
    this.displayMyAccessList = this.myAccessList;
    return this.myAccessList;
  }
}