import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerDayComponent } from './datepicker-day.component';

describe('DatepickerDayComponent', () => {
  let component: DatepickerDayComponent;
  let fixture: ComponentFixture<DatepickerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
