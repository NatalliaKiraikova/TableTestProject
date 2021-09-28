import { AbstractControl } from '@angular/forms';

export function ValidateStoreEntity(control: AbstractControl): { [key: string]: any } | null {
  if (control.value && !control.value.id) {
    return {'Please, select an item from the list': true};
  }
  return null;
}


