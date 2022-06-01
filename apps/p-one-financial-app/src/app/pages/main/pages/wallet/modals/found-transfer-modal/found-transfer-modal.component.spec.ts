import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundTransferModalComponent } from './found-transfer-modal.component';

describe('FoundTransferModalComponent', () => {
  let component: FoundTransferModalComponent;
  let fixture: ComponentFixture<FoundTransferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundTransferModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundTransferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
