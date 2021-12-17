import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitarEmailComponent } from './digitar-email.component';

describe('DigitarEmailComponent', () => {
  let component: DigitarEmailComponent;
  let fixture: ComponentFixture<DigitarEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitarEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitarEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
