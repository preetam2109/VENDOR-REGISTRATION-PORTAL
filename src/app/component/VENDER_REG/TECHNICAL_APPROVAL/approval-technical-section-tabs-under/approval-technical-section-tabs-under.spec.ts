import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalTechnicalSectionTabsUnder } from './approval-technical-section-tabs-under';

describe('ApprovalTechnicalSectionTabsUnder', () => {
  let component: ApprovalTechnicalSectionTabsUnder;
  let fixture: ComponentFixture<ApprovalTechnicalSectionTabsUnder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalTechnicalSectionTabsUnder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalTechnicalSectionTabsUnder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
