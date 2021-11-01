import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDisplayBadgeComponent } from './filter-display-badge.component';

describe('FilterDisplayBadgeComponent', () => {
  let component: FilterDisplayBadgeComponent;
  let fixture: ComponentFixture<FilterDisplayBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterDisplayBadgeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDisplayBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
