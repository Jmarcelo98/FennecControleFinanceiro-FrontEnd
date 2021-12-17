import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitarCodigoComponent } from './digitar-codigo.component';

describe('DigitarCodigoComponent', () => {
  let component: DigitarCodigoComponent;
  let fixture: ComponentFixture<DigitarCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitarCodigoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitarCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
