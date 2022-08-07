import { Component, Inject, OnInit, Optional, TemplateRef } from '@angular/core';

import { TOAST_OPTIONS, TOAST_TEMPLATE, TOAST_TEXT, TOAST_TEXTS, ToastOptions } from './@types/toast.options';
import { TOAST_REF, ToastRef } from './@types/toast.ref';

@Component({
  selector: 'p-one-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  constructor(
    @Optional()
    @Inject(TOAST_TEMPLATE)
    public readonly template: TemplateRef<any>,

    @Optional()
    @Inject(TOAST_TEXT)
    public readonly text: string,

    @Optional()
    @Inject(TOAST_TEXTS)
    public readonly texts: string,

    @Inject(TOAST_OPTIONS)
    public readonly options: ToastOptions,

    @Inject(TOAST_REF)
    public readonly ref: ToastRef
  ) {}

  ngOnInit(): void {}
}
