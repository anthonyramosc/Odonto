import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class TestComponent implements OnInit {
  menu: any;
  dataestrEmpresas: any;

  constructor(
    private _coreMenuService: CoreMenuService,
  ) { }

  ngOnInit(): void {
    this.menu = this._coreMenuService.getCurrentMenu();
  }
  
  isMonthlyViewVisible = true;
  isWeeklyViewVisible = false;
  isDailyViewVisible = false;
  isModalOpen = false;

  newEventText: string = '';
  currentCell: HTMLElement | null = null;

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  currentDate = new Date();
  currentWeekStart = this.getStartOfWeek(new Date());
  currentDay = new Date();

  monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  daysInWeek = [
    "Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."
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

  get weeksInMonth() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  
    let weeks = [];
    let week = Array(firstDay).fill({});
  
    for (let day = 1; day <= daysInMonth; day++) {
      week.push({ day });
  
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
  
    if (week.length > 0) {
      while (week.length < 7) {
        week.push({});
      }
      weeks.push(week);
    }
  
    return weeks;
  }
  

  get currentWeek() {
    const week = [];
    const start = new Date(this.currentWeekStart);
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      week.push(date);
    }
  
    return week;
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

  openModal(day: number | Date | string) {
    if (typeof day === 'number') {
      this.currentDay = new Date(this.currentYear, this.currentMonth, day);
    } else if (day instanceof Date) {
      this.currentDay = day;
    } else {
      console.log('Hora seleccionada:', day);
    }
    console.log('Abrir modal - Fecha: ' + this.currentDay.toDateString()); 
    this.isModalOpen = true;
    console.log('Estado del modal:', this.isModalOpen); 
  }
  
  
  

  closeModal() {
    this.isModalOpen = false;

  }

  addEvent(event: MouseEvent) {
    this.currentCell = (event.target as HTMLElement).closest('td');
    if (this.currentCell) {
      this.openModal(this.currentCell.innerText);
    }
  }
  

  saveEvent() {
    if (this.currentCell && this.newEventText.trim() !== '') {
      const eventDiv = document.createElement('div');
      eventDiv.className = 'event';
      eventDiv.innerText = this.newEventText;
      eventDiv.style.backgroundColor = '#f85656';
      eventDiv.style.color = '#fff';
  
      // Añadir el nuevo evento sin sobrescribir el contenido existente
      this.currentCell.appendChild(eventDiv);
      this.newEventText = ''; // Limpia el texto del nuevo evento
    }
    this.closeModal();
  }
  


  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

  prevWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.currentWeekStart = this.getStartOfWeek(this.currentWeekStart);
  }

  nextWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.currentWeekStart = this.getStartOfWeek(this.currentWeekStart);
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
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    this.currentWeekStart = this.getStartOfWeek(new Date());
    this.currentDay = new Date();
  }

  isToday(day: number): boolean {
    const today = new Date();
    return day === today.getDate() &&
           this.currentMonth === today.getMonth() &&
           this.currentYear === today.getFullYear();
  }
  
  private getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(start.setDate(diff));
  }

}
