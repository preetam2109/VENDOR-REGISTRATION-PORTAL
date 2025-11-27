import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingUnitLicenceTabApproval } from './manufacturing-unit-licence-tab-approval';

describe('ManufacturingUnitLicenceTabApproval', () => {
  let component: ManufacturingUnitLicenceTabApproval;
  let fixture: ComponentFixture<ManufacturingUnitLicenceTabApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingUnitLicenceTabApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturingUnitLicenceTabApproval);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
