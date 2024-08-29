import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

interface Event {
  fullname: string;
  identification: string;
  phone: string;
  email: string;
  doctor: string;
  date: Date;
  time: string;
  referral: string;
  reason: string;
  observations: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})

export class DashboardComponent implements OnInit {
  
  events: { [key: string]: Event[] } = {};
  newEvent: Event = this.createEmptyEvent();

  menu: any;
  dataestrEmpresas: any;

  constructor(
    private _coreMenuService: CoreMenuService,
  ) { }

  ngOnInit(): void {
    this.menu = this._coreMenuService.getCurrentMenu();
    this.generateWeeksInMonth();
  }
  
  isMonthlyViewVisible = true;
  isWeeklyViewVisible = false;
  isDailyViewVisible = false;
  isModalOpen = false;

  newEventText: string = '';
  currentCell: HTMLElement | null = null;
  currentDay= new Date();
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  currentWeekStart: Date = this.getStartOfWeek(new Date());
  weeksInMonth: any[] = [];
  currentWeek: Date= new Date();
  

  
  monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  daysInWeek = [
    "Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."
  ];

  daysInWeeks = [
     "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb.","Dom."
  ];

  hoursInDay = [
    "7:00am", "7:15am", "7:30am", "7:45am",
    "8:00am", "8:15am", "8:30am", "8:45am",
    "9:00am", "9:15am", "9:30am", "9:45am",
    "10:00am", "10:15am", "10:30am", "10:45am",
    "11:00am", "11:15am", "11:30am", "11:45am",
    "12:00pm", "12:15pm", "12:30pm", "12:45pm",
    "1:00pm", "1:15pm", "1:30pm", "1:45pm",
    "2:00pm", "2:15pm", "2:30pm", "2:45pm",
    "3:00pm", "3:15pm", "3:30pm", "3:45pm",
    "4:00pm", "4:15pm", "4:30pm", "4:45pm",
    "5:00pm", "5:15pm", "5:30pm", "5:45pm",
    "6:00pm", "6:15pm", "6:30pm", "6:45pm",
    "7:00pm", "7:15pm", "7:30pm", "7:45pm",
    "8:00pm", "8:15pm", "8:30pm", "8:45pm",
    "9:00pm", "9:15pm", "9:30pm", "9:45pm",
    "10:00pm", "10:15pm", "10:30pm", "10:45pm",
    "11:00pm", "11:15pm", "11:30pm", "11:45pm",
    "12:00am"
  ];


  
  generateWeeksInMonth() {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    
    let weeks = [];
    let week = Array(firstDayOfMonth).fill(null); 
  
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(this.currentYear, this.currentMonth, day);
      const dateKey = this.formatDateKey(currentDate);
      const dayEvents = this.events[dateKey] || [];
      week.push({ day, events: dayEvents});
  
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
  

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }
  
    this.weeksInMonth = weeks;
  }

  showMonthlyView() {
    this.isMonthlyViewVisible = true;
    this.isWeeklyViewVisible = false;
    this.isDailyViewVisible = false;
  }

  showWeeklyView() {
    this.isMonthlyViewVisible = false;
    this.isWeeklyViewVisible = true;
    this.isDailyViewVisible = false;
  }

  showDailyView() {
    this.isMonthlyViewVisible = false;
    this.isWeeklyViewVisible = false;
    this.isDailyViewVisible = true;
  }

  openModal(day: number | Date) {
    if (typeof day === 'number') {
      this.currentDay = new Date(this.currentYear, this.currentMonth, day);
    } else if (day instanceof Date) {
      this.currentDay = day;
    } else {
      this.currentDay = new Date(); // Default to today if invalid input
    }
    this.isModalOpen = true;
    this.newEvent = this.createEmptyEvent();
    this.newEvent.date = this.currentDay;
  }
  
  closeModal() {
    this.isModalOpen = false;
    this.newEvent = this.createEmptyEvent();
  }


  createEmptyEvent(): Event {
    return {
      fullname: '',
      identification: '',
      phone: '',
      email: '',
      doctor: '',
      date: new Date(),
      time: '',
      referral: '',
      reason: '',
      observations: ''
    };
  }

  getEventSummary(events: Event[]): string {
    return events.map(event => `${event.time} - ${event.fullname} - ${event.email}`).join('\n');
  }

  saveEvent() {
    if (!(this.newEvent.date instanceof Date)) {
      console.error('Invalid date:', this.newEvent.date);
      return;
    }
    const dateKey = this.formatDateKey(this.newEvent.date);
    if (!this.events[dateKey]) {
      this.events[dateKey] = [];
    }
    this.events[dateKey].push({...this.newEvent});
    this.closeModal();
    this.generateWeeksInMonth(); // Refresh the calendar view
  }

  formatDateKey(date: Date): string {
    if (!(date instanceof Date)) {
      console.error('Invalid date object:', date);
      return '';
    }
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }


  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateWeeksInMonth(); // Actualiza las semanas después de cambiar el mes
  }
  
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateWeeksInMonth(); // Actualiza las semanas después de cambiar el mes
  }
  

  prevWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.currentWeekStart = this.getStartOfWeek(this.currentWeekStart);
    this.generateWeeksInMonth(); // Actualiza las semanas en la vista
  }
  
  nextWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.currentWeekStart = this.getStartOfWeek(this.currentWeekStart);
    this.generateWeeksInMonth(); // Actualiza las semanas en la vista
  }

  prevDay() {
    this.currentDay.setDate(this.currentDay.getDate() - 1);
    this.currentDay = new Date(this.currentDay);
  }

  nextDay() {
    this.currentDay.setDate(this.currentDay.getDate() + 1);
    this.currentDay = new Date(this.currentDay);
  }



  goToToday() {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    this.currentWeekStart = this.getStartOfWeek(new Date());
    this.currentDay = new Date();
  }

  isToday(day: number): boolean {
    const today = new Date();
    return day === today.getDate() &&
           this.currentMonth === today.getMonth() &&
           this.currentYear === today.getFullYear();
  }
  
  getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(start.setDate(diff));
  }

  getEndOfWeek(startOfWeek: Date): Date {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Seis días después del inicio de la semana
    return endOfWeek;
  }
  

}
