import { Component } from '@angular/core';
import { Field } from '../models/field.interface';
import { FieldConfig } from '../models/field-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements Field {
  field: FieldConfig;
  group: FormGroup;

  constructor() {
  }

}
