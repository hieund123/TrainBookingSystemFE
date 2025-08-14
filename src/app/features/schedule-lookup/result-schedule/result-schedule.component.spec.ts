import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultScheduleComponent } from './result-schedule.component';

describe('ResultScheduleComponent', () => {
  let component: ResultScheduleComponent;
  let fixture: ComponentFixture<ResultScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
