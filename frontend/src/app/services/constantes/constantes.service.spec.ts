import { TestBed } from '@angular/core/testing';

import { ConstantesService } from './constantes.service';

describe('ConstantesService', () => {
  let service: ConstantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
