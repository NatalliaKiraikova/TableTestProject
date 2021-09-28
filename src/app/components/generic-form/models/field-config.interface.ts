import { ValidatorFn } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { StoreEntity } from 'src/app/models/store-entity.model';

export const FIELD_TYPE = {
  label: 'label',
  input: 'input',
  checkbox: 'checkbox',
  select: 'select',
  button: 'button',
};

export interface FieldConfig {
  label?: string;
  htmlLabel?: string;
  name?: string;
  inputType?: string;
  options$?: Observable<StoreEntity[]>;
  options?: StoreEntity[];
  preselectIfOneOption?: boolean;
  multiple?: boolean;
  type: string;
  value?: any;
  value$?: Observable<any>;
  displayedValue?: string;
  validations?: ValidatorFn[];
  placeholder?: string;
  noDataMessage?: string;
  errorMessages?: any;
  color?: string;
  strictNumber?: boolean;
  strictPhone?: boolean;
  disabled?: boolean;
  valueChangedSubject?: Subject<any>;
  selectAll?: boolean;
}

export interface FieldConfigView {
  label: string;
  name: string;
  value?: any;
}
