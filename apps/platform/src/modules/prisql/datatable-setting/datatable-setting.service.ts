import API from '@/services';
import {Model} from "@/util/valtio-helper";

export class DatatableSettingService extends Model {
  datatableList: API.PriSqlDatatable[] = [];
  displayDatatableList: API.PriSqlDatatable[] = [];
  loading = false;

  cclList: API.PriSqlColumnAccess[] = [];
  cclListTmp: API.PriSqlColumnAccess[] = [];
  cclLoading = false;

  getDatatableList = async (projectId: string, member: string) => {
    this.loading = true;
    const response = await API.PriSqlController.getDatatableList(projectId, member);
    const data = response.data;
    this.datatableList = data || [];
    this.loading = false;
    this.displayDatatableList = this.datatableList;
    return this.datatableList;
  }

  createDatatable = async (priSqlDatatable: API.PriSqlDatatable) => {
    this.loading = true;
    const response = await API.PriSqlController.createDatatable(priSqlDatatable);
    const data = response.data;
    await this.getDatatableList(priSqlDatatable.projectId as string, priSqlDatatable.member as string);
    this.loading = false;
    return data;
  }

  deleteDatatable = async (priSqlDatatable: API.PriSqlDatatable) => {
    this.loading = true;
    const response = await API.PriSqlController.deleteDatatable(priSqlDatatable.id as string);
    const data = response.data;
    await this.getDatatableList(priSqlDatatable.projectId as string, priSqlDatatable.member as string);
    this.loading = false;
    return data;
  }

  getCclList = async (datatableId: number) => {
    this.cclLoading = true;
    const response = await API.PriSqlController.getCclList(datatableId);
    const data = response.data;
    this.cclList = data || [];
    this.cclListTmp = this.cclList.map((item, index) => ({
      ...item,
      rowId: index.toString(),
    }));
    this.cclLoading = false;
    return this.cclListTmp;
  }

  handleCclList = async (datatableId: number, newCclList: API.PriSqlColumnAccess[]) => {
    console.log(newCclList);
    const response = await API.PriSqlController.handleCclList(datatableId, newCclList);
    const data = response.data;
    return data;
  }
}