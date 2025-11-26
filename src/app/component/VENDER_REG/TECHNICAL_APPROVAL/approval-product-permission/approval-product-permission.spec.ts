import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalProductPermission } from './approval-product-permission';

describe('ApprovalProductPermission', () => {
  let component: ApprovalProductPermission;
  let fixture: ComponentFixture<ApprovalProductPermission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalProductPermission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalProductPermission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
