export interface OptionModel<T = any> {
  id: string;
  title: string;
  subTitle?: string;
  extra?: T;
  color?: string;
}
