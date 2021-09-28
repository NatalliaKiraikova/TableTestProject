import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FieldConfig } from './models/field-config.interface';

export function updateControl(name: string, control: AbstractControl, fields: FieldConfig[], enable: boolean = true): void {
  const validators: ValidatorFn | ValidatorFn[] | null = [];

  if (control) {
    if (enable) {
      control.enable();
      const field = fields
        .find(f => f.name === name);
      if (field?.validations) {
        validators.push(...field.validations);
      }
    } else {
      control.reset();
      control.disable();
    }
    control.setValidators(validators);
    control.updateValueAndValidity();
  }
}
