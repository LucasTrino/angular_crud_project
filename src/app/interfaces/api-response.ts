import { IPerson } from '../interfaces/interface-persons-datas';

export interface IApiResponse {
  success: boolean;
  data: IPerson;
  errors: string[];
  message: string;
  code: string;
  date: string;
}
