import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalTechnicalCertificate } from './approval-technical-certificate';

describe('ApprovalTechnicalCertificate', () => {
  let component: ApprovalTechnicalCertificate;
  let fixture: ComponentFixture<ApprovalTechnicalCertificate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalTechnicalCertificate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalTechnicalCertificate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
