import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notification'
})
export class NotificationPipe implements PipeTransform {

  transform(value: string): string {

    if (!value) {
      return '';
    }

    let newValue = '';

    if (value === 'INFO') {
      newValue = 'color-blue fa fa-info-circle';
    }

    if (value === 'WARNING') {
      newValue = 'color-orange fa fa-exclamation-circle';
    }

    if (value === 'SUCCESS') {
      newValue = 'color-green fa fa-check-circle';
    }

    if (value === 'ERROR') {
      newValue = 'color-red fa times-circle';
    }

    return newValue;
  }

}
