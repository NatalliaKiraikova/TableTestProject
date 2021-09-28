import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/field-config.interface';
import { Field } from '../models/field.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements Field {
  field: FieldConfig;
  group: FormGroup;

  constructor() {
  }

  onInputKey(event: any): void {
    if (this.field.strictNumber === true) {
      const input = this.group.controls[this.field.name];
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
      input.setValue(event.target.value.replace(/[^0-9]/g, ''));
    }

    if (this.field.strictPhone === true) {
      const input = this.group.controls[this.field.name];
      event.target.value = event.target.value.replace(/[^0-9()+-]/g, '');
      input.setValue(event.target.value.replace(/[^0-9()+-]/g, ''));
    }
  }

  getErrorMessage(err: any): string {
    const errors = Object.keys(err);
    if (errors && errors.length) {
      return (this.field.errorMessages && this.field.errorMessages[errors[0]]) ? this.field.errorMessages[errors[0]] : '';
    } else {
      return '';
    }
  }
}
