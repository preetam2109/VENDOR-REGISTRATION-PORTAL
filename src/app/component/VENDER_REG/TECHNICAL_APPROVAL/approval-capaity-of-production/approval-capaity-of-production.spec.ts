import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalCapaityOfProduction } from './approval-capaity-of-production';

describe('ApprovalCapaityOfProduction', () => {
  let component: ApprovalCapaityOfProduction;
  let fixture: ComponentFixture<ApprovalCapaityOfProduction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalCapaityOfProduction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalCapaityOfProduction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
