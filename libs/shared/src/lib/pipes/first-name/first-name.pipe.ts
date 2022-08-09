import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pOneFirstName',
  standalone: true,
})
export class POneFirstNamePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value ? value.split(' ')[0] : value;
  }
}
