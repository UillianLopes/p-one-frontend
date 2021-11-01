import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pOneFirstName',
})
export class FirstNamePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value ? value.split(' ')[0] : value;
  }
}
