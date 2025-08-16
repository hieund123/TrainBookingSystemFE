import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStationComponent } from './list-station.component';

describe('ListStationComponent', () => {
  let component: ListStationComponent;
  let fixture: ComponentFixture<ListStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
