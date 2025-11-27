import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTechnicalDetailsTab } from './confirm-technical-details-tab';

describe('ConfirmTechnicalDetailsTab', () => {
  let component: ConfirmTechnicalDetailsTab;
  let fixture: ComponentFixture<ConfirmTechnicalDetailsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmTechnicalDetailsTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmTechnicalDetailsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
