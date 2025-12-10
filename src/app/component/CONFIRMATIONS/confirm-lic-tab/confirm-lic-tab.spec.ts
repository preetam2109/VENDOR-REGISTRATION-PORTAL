import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLicTab } from './confirm-lic-tab';

describe('ConfirmLicTab', () => {
  let component: ConfirmLicTab;
  let fixture: ComponentFixture<ConfirmLicTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmLicTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmLicTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
