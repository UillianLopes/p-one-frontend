export interface ResponseModel<T = any> {
  messages: string[];
  data: T;
}
