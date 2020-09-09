import { TestBed } from '@angular/core/testing';

import { DashboardIndividualService } from './dashboard-individual.service';

describe('DashboardIndividualService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardIndividualService = TestBed.get(DashboardIndividualService);
    expect(service).toBeTruthy();
  });
});
