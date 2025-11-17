import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingUnitLicenceTab } from './manufacturing-unit-licence-tab';

describe('ManufacturingUnitLicenceTab', () => {
  let component: ManufacturingUnitLicenceTab;
  let fixture: ComponentFixture<ManufacturingUnitLicenceTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingUnitLicenceTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturingUnitLicenceTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
