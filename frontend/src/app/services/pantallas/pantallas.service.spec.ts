import { TestBed } from '@angular/core/testing';

import { PantallasService } from './pantallas.service';

describe('PantallasService', () => {
  let service: PantallasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PantallasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
