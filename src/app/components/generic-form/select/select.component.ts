import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { Field } from '../models/field.interface';
import { FieldConfig } from '../models/field-config.interface';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements Field, OnInit, OnDestroy {
  field: FieldConfig;
  group: FormGroup;
  options: number[] = [];

  private destroyer: Subject<void> = new Subject<void>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.field.valueChangedSubject) {
      this.field.valueChangedSubject.next(this.field?.value);
    }

    if (this.field?.options) {
      this.options = this.field.options.map(o => o.id);
    } else if (this.field?.options$) {
      this.field.options$.pipe(
        takeUntil(this.destroyer),
        shareReplay()
      )
        .subscribe(options => {
            this.options = options.map(o => o.id);
            if (this.field.preselectIfOneOption && this.options && this.options.length === 1) {
              // preselect single option by default
              this.group.controls[this.field?.name].patchValue(this.options[0]);
              if (this.field.valueChangedSubject) {
                this.field.valueChangedSubject.next(this.options[0]);
              }
            }
          }
        );
    }
    if (this.field.value$) {
      this.field.value$
        .pipe(takeUntil(this.destroyer))
        .subscribe(value => {
          this.group.controls[this.field.name].patchValue(value);
        });
    }
  }

  onChanged(item: MatSelectChange): void {
    if (this.field.valueChangedSubject) {
      this.field.valueChangedSubject.next(item.value);
    }
  }

  ngOnDestroy(): void {
    this.destroyer.next();
    this.destroyer.complete();
  }
}
