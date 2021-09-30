export interface ResponseModel<T> {
  code: number;
  messages: string[];
  data?: T;
}
