import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule, GridModule, TableModule } from '@coreui/angular';
import { ScheduleLookupService } from '../services/schedule-lookup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, GridModule, ButtonModule, TableModule],
  templateUrl: './result-schedule.component.html',
  styleUrl: './result-schedule.component.scss',
})
export class ResultScheduleComponent {
  @Input() journeys: any[] = [];

  constructor(
    private scheduleService: ScheduleLookupService,
    private router: Router
  ) {}

  viewDetail(journeyId: number) {
    this.router.navigate(['/schedule-lookup/detail-schedule', journeyId]);
  }
}
