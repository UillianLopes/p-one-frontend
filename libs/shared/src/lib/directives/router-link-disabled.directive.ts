import { Directive, ElementRef, Input, OnChanges, Optional, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

@Directive({
  selector: '[routerLink][routerLinkDisabled]',
})
export class RouterLinkDisabledDirective implements OnChanges {
  @Input('routerLinkDisabled') public isDisabled: boolean = false;

  constructor(
    @Optional() routerLink: RouterLink,
    @Optional() routerLinkWithHref: RouterLinkWithHref,
    public elementRef: ElementRef,
    public renderer: Renderer2
  ) {
    const link = routerLink ?? routerLinkWithHref;
    const onClick = link.onClick;

    link.onClick = (...args: unknown[]): boolean => {
      if (this.isDisabled) {
        return !routerLinkWithHref;
      }

      return onClick.apply(link, <any>args);
    };
  }

  ngOnChanges() {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'disabled',
      this.isDisabled.toString()
    );
  }
}
