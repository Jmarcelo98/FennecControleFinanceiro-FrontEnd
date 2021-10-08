import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerOffComponent } from './server-off.component';

describe('ServerOffComponent', () => {
  let component: ServerOffComponent;
  let fixture: ComponentFixture<ServerOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
