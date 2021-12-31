import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaDespesaComponent } from './categoria-despesa.component';

describe('CategoriaDespesaComponent', () => {
  let component: CategoriaDespesaComponent;
  let fixture: ComponentFixture<CategoriaDespesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaDespesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
