export interface OptionModel {
  id: string;
  title: string;
  subTitle?: string;

  color?: string;
}

export interface OptionModelWithExtra<T> extends OptionModel {
  extra?: T;
}
