import { Component, OnInit } from '@angular/core';
import { trackById } from '@p-one/core';

import { ProfilesListStoreFacade } from './+state/profiles-list-store.facade';

@Component({
  selector: 'p-one-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss'],
})
export class ProfilesListComponent implements OnInit {
  public readonly trackById = trackById;

  public readonly profiles$ = this._facade.profiles$;
  
  constructor(private readonly _facade: ProfilesListStoreFacade) {}

  public ngOnInit(): void {
    this._facade.loadProfiles();
  }
}
