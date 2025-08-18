import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyStationListComponent } from './journey-station-list.component';

describe('JourneyStationListComponent', () => {
  let component: JourneyStationListComponent;
  let fixture: ComponentFixture<JourneyStationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyStationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JourneyStationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
