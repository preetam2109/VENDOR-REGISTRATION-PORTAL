import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingUnit } from './manufacturing-unit';

describe('ManufacturingUnit', () => {
  let component: ManufacturingUnit;
  let fixture: ComponentFixture<ManufacturingUnit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingUnit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturingUnit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
