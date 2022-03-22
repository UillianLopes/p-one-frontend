import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubCategoryModalComponent } from './update-sub-category-modal.component';

describe('UpdateSubCategoryModalComponent', () => {
  let component: UpdateSubCategoryModalComponent;
  let fixture: ComponentFixture<UpdateSubCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubCategoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
