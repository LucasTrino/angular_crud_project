export interface IApiResponse {
  success: boolean;
  data: any;
  errors: string[];
  message: string;
  code: string;
  date: string;
}
