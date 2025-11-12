import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingUnitUntiTab } from './manufacturing-unit-unti-tab';

describe('ManufacturingUnitUntiTab', () => {
  let component: ManufacturingUnitUntiTab;
  let fixture: ComponentFixture<ManufacturingUnitUntiTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingUnitUntiTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturingUnitUntiTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
