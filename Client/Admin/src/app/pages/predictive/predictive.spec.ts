import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Predictive } from './predictive';

describe('Predictive', () => {
  let component: Predictive;
  let fixture: ComponentFixture<Predictive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Predictive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Predictive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
