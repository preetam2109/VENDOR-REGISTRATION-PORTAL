import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmManufacturingLic } from './confirm-manufacturing-lic';

describe('ConfirmManufacturingLic', () => {
  let component: ConfirmManufacturingLic;
  let fixture: ComponentFixture<ConfirmManufacturingLic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmManufacturingLic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmManufacturingLic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
