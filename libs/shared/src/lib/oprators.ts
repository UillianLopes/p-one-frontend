import { OverlayRef } from '@angular/cdk/overlay';
import { fromEvent, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

export const observeResize$ = (element: HTMLElement) => {
  return new Observable<DOMRect>(function (subscriber) {
    const resizeObserver = new ResizeObserver(() => {
      subscriber.next(element.getBoundingClientRect());
    });

    resizeObserver.observe(element);
    subscriber.next(element.getBoundingClientRect());
  });
};

export function eventOutsideOverlay(
  eventName: string,
  overlayRef: OverlayRef,
  origin: HTMLElement
) {
  return fromEvent<any>(document, eventName).pipe(
    filter((event) => {
      const clickTarget = event.target as HTMLElement;

      const notOrigin = clickTarget !== origin;
      const notOrignChild = !origin.contains(clickTarget);

      const notOverlay =
        !!overlayRef &&
        overlayRef.overlayElement.contains(clickTarget) === false;
      return notOrigin && notOverlay && notOrignChild;
    }),
    takeUntil(overlayRef.detachments())
  );
}
