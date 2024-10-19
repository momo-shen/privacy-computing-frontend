import API from '@/services';
import {Model} from "@/util/valtio-helper";

export class SqlQueryService extends Model{
  runSQL = async (sql: string) => {
    const response = await API.PriSqlController.runSQL(sql);
    return response.data;
  }
}