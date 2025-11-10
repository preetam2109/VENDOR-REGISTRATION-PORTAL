import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaityOfProduction } from './capaity-of-production';

describe('CapaityOfProduction', () => {
  let component: CapaityOfProduction;
  let fixture: ComponentFixture<CapaityOfProduction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapaityOfProduction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapaityOfProduction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
