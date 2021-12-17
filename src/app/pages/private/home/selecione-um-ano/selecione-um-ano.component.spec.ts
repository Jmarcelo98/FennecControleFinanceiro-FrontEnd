import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecioneUmAnoComponent } from './selecione-um-ano.component';

describe('SelecioneUmAnoComponent', () => {
  let component: SelecioneUmAnoComponent;
  let fixture: ComponentFixture<SelecioneUmAnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecioneUmAnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecioneUmAnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
