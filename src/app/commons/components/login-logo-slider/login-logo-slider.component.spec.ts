import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLogoSliderComponent } from './login-logo-slider.component';

describe('LoginLogoSliderComponent', () => {
  let component: LoginLogoSliderComponent;
  let fixture: ComponentFixture<LoginLogoSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginLogoSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLogoSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
