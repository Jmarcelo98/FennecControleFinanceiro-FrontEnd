import { Directive } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const FORMATADO_MES_ANO = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Directive({
  selector: '[appDateFormatCostom]',
  providers: [{
    provide: MAT_DATE_FORMATS, useValue: FORMATADO_MES_ANO
  }]
})

export class DateFormatCostomDirective {

  constructor() { }

}
