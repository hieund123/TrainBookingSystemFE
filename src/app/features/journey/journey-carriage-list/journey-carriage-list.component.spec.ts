import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyCarriageListComponent } from './journey-carriage-list.component';

describe('JourneyCarriageListComponent', () => {
  let component: JourneyCarriageListComponent;
  let fixture: ComponentFixture<JourneyCarriageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyCarriageListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JourneyCarriageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
