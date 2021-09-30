import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';

export class LuxonDateFormatterParser extends NgbDateParserFormatter {
  constructor(private readonly luxonFormat: string) {
    super();
  }

  parse(value: string): NgbDateStruct | null {
    if (!value || value == '') {
      return null;
    }

    const dateTime = DateTime.fromFormat(value, this.luxonFormat);

    return dateTime.isValid
      ? {
          year: dateTime.year,
          month: dateTime.month,
          day: dateTime.day,
        }
      : null;
  }

  format(date: NgbDateStruct | null): string {
    if (!date) {
      return ``;
    }

    const convertedDate = DateTime.local(date.year, date.month, date.day);

    return convertedDate.isValid
      ? convertedDate.toFormat(this.luxonFormat)
      : ``;
  }
}
