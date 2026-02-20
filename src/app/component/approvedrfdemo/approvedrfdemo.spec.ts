import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Approvedrfdemo } from './approvedrfdemo';

describe('Approvedrfdemo', () => {
  let component: Approvedrfdemo;
  let fixture: ComponentFixture<Approvedrfdemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Approvedrfdemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Approvedrfdemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
