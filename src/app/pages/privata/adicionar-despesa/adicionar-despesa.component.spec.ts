import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarDespesaComponent } from './adicionar-despesa.component';

describe('AdicionarDespesaComponent', () => {
  let component: AdicionarDespesaComponent;
  let fixture: ComponentFixture<AdicionarDespesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarDespesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
