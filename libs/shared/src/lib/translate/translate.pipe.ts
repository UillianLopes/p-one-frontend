import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'pOneTranslate',
})
export class TranslatePipe implements PipeTransform {
  constructor(private readonly _translateService: TranslateService) {}

  transform(value: unknown, ...args: any[]): any {
    if (typeof value === 'string') {
      return this._translateService.instant(value);
    }

    if (value instanceof Array) {
      return value.map((item) =>
        typeof item === 'string' ? this._translateService.instant(item) : item
      );
    }

    return value;
  }
}
