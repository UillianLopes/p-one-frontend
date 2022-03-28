import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancesOvertimeChartComponent } from './balances-overtime-chart.component';

describe('BalancesOvertimeChartComponent', () => {
  let component: BalancesOvertimeChartComponent;
  let fixture: ComponentFixture<BalancesOvertimeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BalancesOvertimeChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancesOvertimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
