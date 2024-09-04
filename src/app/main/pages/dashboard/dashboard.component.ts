import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { DashboardService, Event } from './dashboard.service';
import { v4 as uuidv4 } from 'uuid';

registerLocaleData(localeEs, 'es');



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})

export class DashboardComponent implements OnInit {
  
  events: Event[] = [];
  newEvent: Event;

  menu: any;
  dataestrEmpresas: any;

  constructor(
    private _coreMenuService: CoreMenuService,
    private dashboardService: DashboardService
  ) { 
    this.newEvent = this.createEmptyEvent();
  }

  ngOnInit(): void {
    this.menu = this._coreMenuService.getCurrentMenu();
    this.loadEvents();
    
  }

  loadEvents(): void {
    console.log('Iniciando carga de eventos...');
    this.dashboardService.getEvents()
      .subscribe(
        events => {
          console.log('Eventos cargados:', events);
          this.events = events;
          this.generateWeeksInMonth();
        },
        error => console.error('Error al cargar eventos:', error)
      );
  }
  
  isMonthlyViewVisible = true;
  isWeeklyViewVisible = false;
  isDailyViewVisible = false;
  isModalOpen = false;
  isSummaryOpen = false;
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
     "Lun.", "Mar.", "Mié.", "Jue.", "Vie."
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
    console.log('Generando semanas del mes...');
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    
    let weeks = [];
    let week = Array(firstDayOfMonth).fill(null); 
  
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(this.currentYear, this.currentMonth, day);
      const dateString = currentDate.toISOString().split('T')[0];
      const dayEvents = this.events.filter(event => event.date === dateString);
      week.push({ day, events: dayEvents });

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
    console.log('Semanas generadas:', this.weeksInMonth);
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
      this.currentDay = new Date(); 
    }
    this.isModalOpen = true;
    this.newEvent = this.createEmptyEvent();
    this.newEvent.date = this.currentDay.toISOString().split('T')[0];
  }

  openSummary(){
    this.isSummaryOpen = true;
  }
  
  closeModal() {
    this.isModalOpen = false;
    this.newEvent = this.createEmptyEvent();
  }


  createEmptyEvent(): Event {
    return {
      id: uuidv4(),
      fullname: '',
      identification: '',
      phone: '',
      email: '',
      doctor: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      referral: '',
      reason: '',
      observations: ''
    };
  }

  getEventSummary(events: Event[]): string {
    return events.map(event => `${event.time} - ${event.fullname}`).join('\n');
  }

  saveEvent(): void {
    console.log('Guardando evento:', this.newEvent);
    this.dashboardService.addEvent(this.newEvent)
      .subscribe(
        savedEvent => {
          console.log('Evento guardado:', savedEvent);
          this.events.push(savedEvent);
          this.generateWeeksInMonth();
          this.closeModal();
        },
        error => console.error('Error al guardar evento:', error)
      );
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
    this.generateWeeksInMonth();
  }
  
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateWeeksInMonth(); 
  }
  

  prevWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.currentWeekStart = this.getStartOfWeek(this.currentWeekStart);
    this.generateWeeksInMonth(); 
  }
  
  nextWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.currentWeekStart = this.getStartOfWeek(this.currentWeekStart);
    this.generateWeeksInMonth(); 
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
    endOfWeek.setDate(startOfWeek.getDate() + 6); 
    return endOfWeek;
  }
  

}
