import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsDisplayButtonComponent } from './notifications-display-button.component';

describe('NotificationsDisplayButtonComponent', () => {
  let component: NotificationsDisplayButtonComponent;
  let fixture: ComponentFixture<NotificationsDisplayButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsDisplayButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsDisplayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
