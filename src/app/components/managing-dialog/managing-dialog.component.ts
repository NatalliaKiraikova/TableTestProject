import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { FieldConfig } from '../generic-form/models/field-config.interface';

export const DELETE_ACTION = 'DEL';


@Component({
  selector: 'app-managing-dialog',
  templateUrl: './managing-dialog.component.html',
  styleUrls: ['./managing-dialog.component.scss']
})
export class ManagingDialogComponent implements OnInit, OnDestroy {
  public fields: FieldConfig[];
  public form: FormGroup;
  private destroyer: Subject<void> = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<ManagingDialogComponent>,
    private notification: NotificationService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ManagingDialogData,
  ) {
  }

  ngOnInit(): void {
    this.fields = this.data.fields.map(field => {
      return {...field};
    });
    if (this.data && this.data.item) {
      this.fields.forEach(field => {
        field.value = this.data.item[field.name];
      });
    }
  }

  onFormReady(form: object): void {
    this.form = form as FormGroup;
  }

  onFormChange(form: object): void {
    if (this.data.changeHandler) {
      this.data.changeHandler(form as FormGroup);
    }
  }

  onSubmit(): void {
    const formData = {...this.data.item, ...this.form.value};
    if (this.data?.submit) {
      this.data.submit(formData)
        .pipe(takeUntil(this.destroyer))
        .subscribe(
          () => this.dialogRef.close(formData),
          error => this.notification.error(error.message)
        );
    } else {
      this.dialogRef.close(formData);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialog.open(ConfirmationComponent, {
      data: {message: this.data.labels.confirmDelete},
      autoFocus: false,
    }).afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.dialogRef.close(DELETE_ACTION);
    });
  }

  ngOnDestroy(): void {
    this.destroyer.next();
    this.destroyer.complete();
  }
}

/**
 * ManagingDialogData object for providing data into the ManagingDialog
 * labels - string values with translations
 * fields - FieldConfig[] array for creation GenericForm on the ManagingDialog
 * item - Model object for edit in the ManagingDialog
 * changeHandler - callback function to listen GenericForm Changed events
 * submit - submit function
 */

export class ManagingDialogData {
  labels: {
    dialogTitle: string,
    submitButtonText: string,
    cancelButtonText: string,
    deleteButtonText?: string,
    confirmDelete?: string
  };
  fields: FieldConfig[];
  item?: any;
  changeHandler?: (form: FormGroup) => void;
  submit?: (data: any) => Observable<any>;
}
