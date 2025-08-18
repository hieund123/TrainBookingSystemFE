import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailJourneyComponent } from './detail-journey.component';

describe('DetailJourneyComponent', () => {
  let component: DetailJourneyComponent;
  let fixture: ComponentFixture<DetailJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailJourneyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
