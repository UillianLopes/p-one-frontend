import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFilterModalComponent } from './dashboard-filter-modal.component';

describe('DashboardFilterModalComponent', () => {
  let component: DashboardFilterModalComponent;
  let fixture: ComponentFixture<DashboardFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardFilterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
