import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthYearPickerSelectorComponent } from './month-year-picker-selector.component';

describe('MonthYearPickerSelectorComponent', () => {
  let component: MonthYearPickerSelectorComponent;
  let fixture: ComponentFixture<MonthYearPickerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthYearPickerSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthYearPickerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
