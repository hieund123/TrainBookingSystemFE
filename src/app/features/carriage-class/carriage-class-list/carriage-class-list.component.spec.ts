import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriageClassListComponent } from './carriage-class-list.component';

describe('CarriageClassListComponent', () => {
  let component: CarriageClassListComponent;
  let fixture: ComponentFixture<CarriageClassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriageClassListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarriageClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
