import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pOneInitials',
    standalone: true,
})
export class POneInitialsPipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): string {
        if (typeof value !== 'string') {
            return value;
        }

        const words = value.split(' ');

        if (words.length === 1) {
            const word = words[0];
            return `${word.charAt(0)}${word.charAt(word.length - 1)}`.toUpperCase();
        }

        const firstWord = words[0];
        const lastWord = words[words.length - 1];

        return `${firstWord.charAt(0)}${lastWord.charAt(0)}`.toUpperCase();
    }
}