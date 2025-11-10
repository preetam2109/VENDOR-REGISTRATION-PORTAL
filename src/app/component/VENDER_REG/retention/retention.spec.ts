import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Retention } from './retention';

describe('Retention', () => {
  let component: Retention;
  let fixture: ComponentFixture<Retention>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Retention]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Retention);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
