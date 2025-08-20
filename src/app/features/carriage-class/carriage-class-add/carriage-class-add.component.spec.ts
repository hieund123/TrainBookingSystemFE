import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriageClassAddComponent } from './carriage-class-add.component';

describe('CarriageClassAddComponent', () => {
  let component: CarriageClassAddComponent;
  let fixture: ComponentFixture<CarriageClassAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriageClassAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarriageClassAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
