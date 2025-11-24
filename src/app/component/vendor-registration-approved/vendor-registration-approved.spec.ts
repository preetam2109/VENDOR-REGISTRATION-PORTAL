import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRegistrationApproved } from './vendor-registration-approved';

describe('VendorRegistrationApproved', () => {
  let component: VendorRegistrationApproved;
  let fixture: ComponentFixture<VendorRegistrationApproved>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorRegistrationApproved]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorRegistrationApproved);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
