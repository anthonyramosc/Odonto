import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  view: 'month' | 'week' | 'day' = 'month';
  currentDate: Date = new Date();
  
  setView(view: 'month' | 'week' | 'day') {
    this.view = view;
  }

  setCurrentDate(date: Date) {
    this.currentDate = date;
  }

  getDaysInMonth() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  }

  getStartOfWeek() {
    const start = new Date(this.currentDate);
    start.setDate(start.getDate() - start.getDay());
    return start;
  }

  getDaysOfWeek() {
    const startOfWeek = this.getStartOfWeek();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  }

  getEventsForDay(date: Date) {
    return [];
  }

}
