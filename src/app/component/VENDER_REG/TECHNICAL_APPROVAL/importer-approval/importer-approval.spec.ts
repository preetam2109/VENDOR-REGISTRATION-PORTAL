import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporterApproval } from './importer-approval';

describe('ImporterApproval', () => {
  let component: ImporterApproval;
  let fixture: ComponentFixture<ImporterApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImporterApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImporterApproval);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
