import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from './models/field-config.interface';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
})
export class GenericFormComponent implements OnChanges, OnInit {
  @Input() fields: FieldConfig[];
  @Input() buttons: FieldConfig[];
  @Output() submitHandler: EventEmitter<object> = new EventEmitter<object>();
  @Output() changeHandler: EventEmitter<object> = new EventEmitter<object>();
  @Output() formReady: EventEmitter<object> = new EventEmitter<object>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.form = this.createGroup();
    this.formReady.emit(this.form);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fields && changes.fields.currentValue !== changes.fields.previousValue) {
      this.form = this.createGroup();
      this.changeHandler.emit(this.form);
    }
  }

  createGroup(): FormGroup {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      const control = this.fb.control(
        field.value,
        Validators.compose(field.validations || []),
      );
      if (field.disabled) {
        control.disable();
      }
      group.addControl(field.name, control);
    });

    return group;
  }

  patchValue(value): void {
    this.form.patchValue(value);
    this.changeHandler.emit(this.form);
  }

  onChange(): void {
    this.changeHandler.emit(this.form);
  }

  submit(): void {
    this.submitHandler.emit(this.form.value);
  }
}
