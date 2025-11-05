import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedGoods } from './finished-goods';

describe('FinishedGoods', () => {
  let component: FinishedGoods;
  let fixture: ComponentFixture<FinishedGoods>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedGoods]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedGoods);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
