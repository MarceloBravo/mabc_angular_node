import { TestBed } from '@angular/core/testing';

import { ScriptServicesService } from './script-services.service';

describe('ScriptServicesService', () => {
  let service: ScriptServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
