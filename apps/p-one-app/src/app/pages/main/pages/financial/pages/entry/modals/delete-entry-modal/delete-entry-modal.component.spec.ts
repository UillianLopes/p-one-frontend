import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEntryModalComponent } from './delete-entry-modal.component';

describe('DeleteEntryModalComponent', () => {
  let component: DeleteEntryModalComponent;
  let fixture: ComponentFixture<DeleteEntryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEntryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
