import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateQueueComponent } from './candidate-queue.component';

describe('CandidateQueueComponent', () => {
  let component: CandidateQueueComponent;
  let fixture: ComponentFixture<CandidateQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
