import { Directive, ElementRef, OnInit } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface DatepickerDirectiveState {}

export class DatepickerDirectiveStore extends ComponentStore<DatepickerDirectiveState> {}
@Directive({
  selector: 'input[pOneDatepicker]',
})
export class DatepickerDirective implements OnInit {
  constructor(private readonly _elementRef: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {}
}
