import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleAutocompleteComponent } from './multiple-autocomplete.component';

describe('MultipleAutocompleteComponent', () => {
  let component: MultipleAutocompleteComponent;
  let fixture: ComponentFixture<MultipleAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
