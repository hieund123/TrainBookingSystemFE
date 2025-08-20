import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriageClassEditComponent } from './carriage-class-edit.component';

describe('CarriageClassEditComponent', () => {
  let component: CarriageClassEditComponent;
  let fixture: ComponentFixture<CarriageClassEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriageClassEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarriageClassEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
