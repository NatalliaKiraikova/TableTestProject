import { Component, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-select-check-all',
  template: `
    <mat-checkbox class="mat-option"
                  [disableRipple]="true"
                  [checked]="isChecked()"
                  [indeterminate]="isIndeterminate()"
                  (click)="$event.stopPropagation()"
                  (change)="toggleSelection($event)">
      Select All
    </mat-checkbox>
  `,
  styles: ['']
})
export class SelectCheckAllComponent {
  @Input() control: AbstractControl;
  @Input() optionIds: number[] = [];

  constructor() {
  }

  isChecked(): boolean {
    return this.control && this.control.value && this.control.value.length
      && this.control.value.length === this.optionIds?.length;
  }

  isIndeterminate(): boolean {
    return Boolean(this.control && this.control.value && this.control.value.length
      && this.control.value.length !== this.optionIds?.length);
  }

  toggleSelection(change: MatCheckboxChange): void {
    if (this.control) {
      this.control.patchValue(change.checked ? this.optionIds : []);
    }
  }
}
