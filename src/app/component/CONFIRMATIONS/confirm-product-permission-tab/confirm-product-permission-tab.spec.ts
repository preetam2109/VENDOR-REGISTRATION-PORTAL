import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmProductPermissionTab } from './confirm-product-permission-tab';

describe('ConfirmProductPermissionTab', () => {
  let component: ConfirmProductPermissionTab;
  let fixture: ComponentFixture<ConfirmProductPermissionTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmProductPermissionTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmProductPermissionTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
