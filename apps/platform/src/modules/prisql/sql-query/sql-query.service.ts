import API from '@/services';
import {Model} from "@/util/valtio-helper";

export class SqlQueryService extends Model{
  runSQL = async (scql: string) => {
    const response = await API.PriSqlController.runSQL(scql);
    return response.data;
  }
}