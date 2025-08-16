import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteStationComponent } from './confirm-delete-station.component';

describe('ConfirmDeleteStationComponent', () => {
  let component: ConfirmDeleteStationComponent;
  let fixture: ComponentFixture<ConfirmDeleteStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteStationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDeleteStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
