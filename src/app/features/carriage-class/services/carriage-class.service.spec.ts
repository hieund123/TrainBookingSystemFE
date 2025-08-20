import { TestBed } from '@angular/core/testing';

import { CarriageClassService } from './carriage-class.service';

describe('CarriageClassService', () => {
  let service: CarriageClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarriageClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
