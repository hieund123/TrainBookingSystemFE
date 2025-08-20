import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { carriageClassRoutes } from './carriage-class.routes';
import { CarriageClassEditComponent } from './carriage-class-edit/carriage-class-edit.component';
import { CarriageClassAddComponent } from './carriage-class-add/carriage-class-add.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(carriageClassRoutes),
    CarriageClassEditComponent,
    CarriageClassAddComponent,
  ],
})
export class CarriageClassModule {}
