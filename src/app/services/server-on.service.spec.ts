import { TestBed } from '@angular/core/testing';

import { ServerOnService } from './server-on.service';

describe('ServerOnService', () => {
  let service: ServerOnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerOnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
