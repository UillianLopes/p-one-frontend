import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavCollapseComponent } from './sidenav-collapse.component';

describe('SidenavCollapseComponent', () => {
  let component: SidenavCollapseComponent;
  let fixture: ComponentFixture<SidenavCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavCollapseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
