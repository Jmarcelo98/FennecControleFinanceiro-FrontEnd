import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarReceitaComponent } from './adicionar-receita.component';

describe('AdicionarReceitaComponent', () => {
  let component: AdicionarReceitaComponent;
  let fixture: ComponentFixture<AdicionarReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarReceitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
