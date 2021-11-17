import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbCustomDateAdapter extends NgbDateAdapter<Date> {
  fromModel(value: Date | null): NgbDateStruct | null {
    if (!value) {
      return null;
    }

    return {
      day: value.getDate(),
      month: value.getMonth() + 1,
      year: value.getFullYear(),
    };
  }
  toModel(date: NgbDateStruct | null): Date | null {
    if (!date) {
      return null;
    }

    return new Date(date.year, date.month - 1, date.day);
  }
}
