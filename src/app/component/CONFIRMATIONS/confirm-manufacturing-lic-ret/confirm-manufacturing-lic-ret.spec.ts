import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmManufacturingLicRet } from './confirm-manufacturing-lic-ret';

describe('ConfirmManufacturingLicRet', () => {
  let component: ConfirmManufacturingLicRet;
  let fixture: ComponentFixture<ConfirmManufacturingLicRet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmManufacturingLicRet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmManufacturingLicRet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
