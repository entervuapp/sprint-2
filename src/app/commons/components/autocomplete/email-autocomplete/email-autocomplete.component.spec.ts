import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAutocompleteComponent } from './email-autocomplete.component';

describe('EmailAutocompleteComponent', () => {
  let component: EmailAutocompleteComponent;
  let fixture: ComponentFixture<EmailAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
