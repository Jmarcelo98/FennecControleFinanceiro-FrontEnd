import { TestBed } from '@angular/core/testing';

import { TipoDespesaService } from './tipo-despesa.service';

describe('TipoDespesaService', () => {
  let service: TipoDespesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDespesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
