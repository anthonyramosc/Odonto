import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  currentMonth: number = this.currentDate.getMonth();
  currentWeekStart: Date = this.getStartOfWeek(this.currentDate);
  currentDay: Date = this.currentDate;
  view: string = 'month';  // 'month', 'week', 'day'
  events: any[] = [];
  newEventTitle: string = '';

  // Cambiar la vista
  setView(view: string) {
    this.view = view;
  }

  // Ir a la fecha de hoy
  goToToday() {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    this.currentWeekStart = this.getStartOfWeek(this.currentDate);
    this.currentDay = this.currentDate;
  }

  // Obtener los días en el mes actual
  getDaysInMonth(): number[] {
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  // Obtener los días de la semana actual
  getDaysOfWeek(): Date[] {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(new Date(this.currentWeekStart.getFullYear(), this.currentWeekStart.getMonth(), this.currentWeekStart.getDate() + i));
    }
    return days;
  }

  // Obtener el inicio de la semana (suponiendo que la semana comienza en domingo)
  getStartOfWeek(date: Date): Date {
    const day = date.getDay(); // día de la semana (0 = domingo, 6 = sábado)
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  }

  // Abrir modal para agregar eventos
  openModal(day: number) {
    const selectedDate = new Date(this.currentYear, this.currentMonth, day);
    console.log('Fecha seleccionada:', selectedDate);
    // Código para abrir el modal utilizando Bootstrap
    // Asume que el modal tiene un ID de 'eventModal'
    `$('#eventModal').modal('show')`;
  }

  // Guardar un evento
  saveEvent() {
    if (this.newEventTitle.trim()) {
      this.events.push({
        title: this.newEventTitle,
        date: this.currentDay
      });
      this.newEventTitle = '';
      `$('#eventModal').modal('hide')`;
    }
  }

  // Obtener los eventos para un día específico
  getEventsForDay(date: Date): any[] {
    return this.events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  }
}
