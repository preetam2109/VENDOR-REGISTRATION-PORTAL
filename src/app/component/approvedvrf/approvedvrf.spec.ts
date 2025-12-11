import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Approvedvrf } from './approvedvrf';

describe('Approvedvrf', () => {
  let component: Approvedvrf;
  let fixture: ComponentFixture<Approvedvrf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Approvedvrf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Approvedvrf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
