import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRegistrationCompleted } from './vendor-registration-completed';

describe('VendorRegistrationCompleted', () => {
  let component: VendorRegistrationCompleted;
  let fixture: ComponentFixture<VendorRegistrationCompleted>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorRegistrationCompleted]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorRegistrationCompleted);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
