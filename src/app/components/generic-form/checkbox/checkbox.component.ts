import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/field-config.interface';
import { Field } from '../models/field.interface';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements Field {
  group: FormGroup;
  field: FieldConfig;
  @Output() changeHandler: EventEmitter<object> = new EventEmitter<object>();

  constructor() {
  }

  onChange(event): void {
    this.changeHandler.emit(event);
  }

}
