import { TestBed } from '@angular/core/testing';

import { DisparadorService } from './disparador.service';

describe('DisparadorService', () => {
  let service: DisparadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisparadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
