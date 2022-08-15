import { animate, group, state, style, transition, trigger } from '@angular/animations';

export const collapseAnimation = trigger('collapseAnimation', [
  state('OPENED', style({ height: '*', overflow: 'auto' })),
  state('CLOSED', style({ height: '0px', overflow: 'hidden' })),

  transition(
    'OPENED => CLOSED',
    group([
      animate('300ms ease-out', style({ height: 0 })),
      animate('300ms steps(1,start)', style({ overflow: 'hidden' })),
    ])
  ),
  transition(
    'CLOSED => OPENED',
    group([
      animate('300ms ease-out', style({ height: '*' })),
      animate('300ms steps(1,end)', style({ overflow: 'visible' })),
    ])
  ),
]);
