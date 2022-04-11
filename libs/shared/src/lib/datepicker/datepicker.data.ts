export interface DatepickerData {
  year: number;
  month: number;
  day: number;
}

export interface RangepickerData {
  begin?: DatepickerData;
  end?: DatepickerData;
}
export interface RangepickerValue {
  begin?: Date;
  end?: Date;
}
