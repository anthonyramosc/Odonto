import { Directive, Host } from '@angular/core';
import { Calendar } from 'primeng/calendar';
@Directive({
  selector: '[appPCalendarLocal]'
})
export class PCalendarLocalDirective {

  locale = {
    //date
    closeText: "Cerrar",
    prevText: "<Ant",
    nextText: "Sig>",
    currentText: "Hoy",
    monthNames: [ "enero","febrero","marzo","abril","mayo","junio",
      "julio","agosto","septiembre","octubre","noviembre","diciembre" ],
    monthNamesShort: [ "ene","feb","mar","abr","may","jun",
      "jul","ago","sep","oct","nov","dic" ],
    dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
    dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
    dayNamesMin: [ "D","L","M","X","J","V","S" ],
    weekHeader: "Sm",
    dateFormat: "dd/mm/yy",
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: "",

    //time
    timeOnlyTitle: 'Elegir una hora',
    timeText: 'Hora',
    hourText: 'Horas',
    minuteText: 'Minutos',
    secondText: 'Segundos',
    millisecText: 'Milisegundos',
    microsecText: 'Microsegundos',
    timezoneText: 'Uso horario',
    timeFormat: 'HH:mm',
    timeSuffix: '',
    amNames: ['a.m.', 'AM', 'A'],
    pmNames: ['p.m.', 'PM', 'P'],
  };

  // This way, injecting the component by @Host, is a workaround, this is an open issue in angular: https://github.com/angular/angular/issues/13776
  constructor(@Host() private pCalendar: Calendar) {
    pCalendar.locale = this.locale;
  }
}
