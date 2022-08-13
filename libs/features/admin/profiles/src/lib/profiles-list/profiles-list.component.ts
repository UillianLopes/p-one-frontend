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
  
  constructor(private readonly _profilesListStore: ProfilesListStoreFacade) {}

  public ngOnInit(): void {
    this._profilesListStore.loadProfiles();
  }
}
