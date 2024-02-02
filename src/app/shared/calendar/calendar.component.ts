/*
 * Copyright (c) 2024 Maritime Connectivity Platform Consortium
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from '@angular/core';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { DayCellComponent } from './day-cell/day-cell.component';

@Component({
  selector: 'ngx-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
  entryComponents: [DayCellComponent],
})
export class CalendarComponent {
  date = new Date();
  date2 = new Date();
  range: NbCalendarRange<Date>;
  dayCellComponent = DayCellComponent;
  constructor(protected dateService: NbDateService<Date>) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };
  }
  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }
  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }
}