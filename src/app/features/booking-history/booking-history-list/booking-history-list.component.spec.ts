import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHistoryListComponent } from './booking-history-list.component';

describe('BookingHistoryListComponent', () => {
  let component: BookingHistoryListComponent;
  let fixture: ComponentFixture<BookingHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingHistoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
