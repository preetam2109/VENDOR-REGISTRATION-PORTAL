import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmImporterLicTab } from './confirm-importer-lic-tab';

describe('ConfirmImporterLicTab', () => {
  let component: ConfirmImporterLicTab;
  let fixture: ComponentFixture<ConfirmImporterLicTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmImporterLicTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmImporterLicTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
