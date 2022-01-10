import { animate, state, style, transition, trigger } from '@angular/animations';

export const sidenavColllapseAnimation = trigger('sidenavColllapseAnimation', [
  state(
    '*',
    style({
      height: '0px',
    })
  ),

  state('OPENED', style({ height: '*' })),
  state('CLOSED', style({ height: '0px' })),

  transition('OPENED => CLOSED', animate('.2s linear')),
  transition('CLOSED => OPENED', animate('.2s linear')),
]);

export const sidenavColllapseIconAnimation = trigger(
  'sidenavColllapseIconAnimation',
  [
    state('OPENED', style({ transform: 'rotateZ(90deg)' })),
    state('CLOSED', style({ transform: 'rotateZ(0deg)' })),

    transition('OPENED => CLOSED', animate('.2s linear')),
    transition('CLOSED => OPENED', animate('.2s linear')),
  ]
);

export const sidenavCollapseLeftPaddingAnimation = trigger(
  'sidenavCollapseLeftPaddingAnimation',
  [
    state('OPENED', style({ paddingLeft: '{{paddingLeft}}px' }), {
      params: { paddingLeft: 0 },
    }),
    state('CLOSED', style({ paddingLeft: '0px' })),

    transition('OPENED => CLOSED', animate('.2s linear')),
    transition('CLOSED => OPENED', animate('.2s linear')),
  ]
);
