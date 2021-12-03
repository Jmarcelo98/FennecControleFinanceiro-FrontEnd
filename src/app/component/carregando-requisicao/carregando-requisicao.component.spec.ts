import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregandoRequisicaoComponent } from './carregando-requisicao.component';

describe('CarregandoRequisicaoComponent', () => {
  let component: CarregandoRequisicaoComponent;
  let fixture: ComponentFixture<CarregandoRequisicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarregandoRequisicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarregandoRequisicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
