import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateCertificationComponent } from './evaluate-certification.component';

describe('EvaluateCertificationComponent', () => {
  let component: EvaluateCertificationComponent;
  let fixture: ComponentFixture<EvaluateCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EvaluateCertificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluateCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
