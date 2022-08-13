import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs';

import { DestroyableMixin } from '../@mixins';
import { Color } from '../@types';
import { ButtonAppearance, ButtonSize, ButtonStore, MANAGED_CLASSES } from './button.state';

@Component({
  selector: 'button[p-one-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  providers: [ButtonStore],
  host: {
    class: 'btn',
  },
})
export class ButtonComponent extends DestroyableMixin() implements OnInit {
  @Input() public set isLoading(isLoading: boolean) {
    this._store.setIsLoading(isLoading);
  }

  @Input() public set size(size: ButtonSize) {
    this._store.setSize(size);
  }

  @Input() public set color(color: Color) {
    this._store.setColor(color);
  }

  @Input() public set appearance(appearance: ButtonAppearance) {
    this._store.setAppearance(appearance);
  }

  @Input() public set disabled(disabled: boolean) {
    this._store.setDisabled(disabled);
  }

  public readonly classes$ = this._store.classes$;
  public readonly isLoading$ = this._store.isLoading$;
  public readonly isDisabled$ = this._store.isDisabled$;

  constructor(
    private readonly _store: ButtonStore,
    private readonly _elementRef: ElementRef<HTMLButtonElement>,
    private readonly _renderer2: Renderer2
  ) {
    super();
  }
  ngOnInit(): void {
    this.isDisabled$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (isDisabled) => (this._elementRef.nativeElement.disabled = isDisabled)
      );

    this.classes$.pipe(takeUntil(this.destroyed$)).subscribe((classes) => {
      const classList = Array.from(this._elementRef.nativeElement.classList);
      const toBeRemovedClasses = classList.filter(
        (className) =>
          MANAGED_CLASSES.includes(className) && !classes.includes(className)
      );

      const toBeAddedClasses = classes.filter(
        (className) => !classList.includes(className)
      );

      for (const toBeRemovedClass of toBeRemovedClasses) {
        this._renderer2.removeClass(
          this._elementRef.nativeElement,
          toBeRemovedClass
        );
      }

      for (const toBeAddedClass of toBeAddedClasses) {
        this._renderer2.addClass(
          this._elementRef.nativeElement,
          toBeAddedClass
        );
      }
    });
  }
}
