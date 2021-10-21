import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'p-one-sidenav-content,[pOneSidenavContent]',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'p-one-sidenav-content',
  },
})
export class SidenavContentComponent {}
