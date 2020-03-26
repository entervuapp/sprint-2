import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaSampleComponent } from './qa-sample.component';

describe('QaSampleComponent', () => {
  let component: QaSampleComponent;
  let fixture: ComponentFixture<QaSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
