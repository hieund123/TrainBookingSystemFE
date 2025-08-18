import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJourneyInScheduleComponent } from './list-journey-in-schedule.component';

describe('ListJourneyInScheduleComponent', () => {
  let component: ListJourneyInScheduleComponent;
  let fixture: ComponentFixture<ListJourneyInScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListJourneyInScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListJourneyInScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
