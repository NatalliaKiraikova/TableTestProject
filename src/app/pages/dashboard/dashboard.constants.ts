import { InjectionToken } from '@angular/core';
import { Validators } from '@angular/forms';
import { FIELD_TYPE } from '../../components/generic-form/models/field-config.interface';

export const DASHBOARD_LABELS = {
  pageTitle: 'List',
  diaologAddTitle: 'Add new item',
  diaologEditTitle: 'Edit item',
  newButtonText: 'New',
  cancelButtonText: 'Cancel',
  submitButtonText: 'Submit',
  shareButtonText: 'Share',
  deleteButtonText: 'Delete',
  successCreate: 'Item has been created',
  successUpdate: 'Item has been updated',
  successDelete: 'Item has been deleted',
  confirmShare: 'Are you sure you want to Share selected item?',
  confirmUnshare: 'Are you sure you want to Unshare selected item?',
  confirmDelete: 'Are you sure you want to Delete selected items?',
  processError: 'Some items not processed by the reason:',
  columns: {
    code: ' Unit ID',
    type: 'Type',
    address: 'Address',
    status: 'Status'
  }
};

export const TABLE_COLUMNS = ['action', 'code', 'type', 'address', 'shared', 'edit'];

export const FORM = new InjectionToken('Truck Form', {
  providedIn: 'root',
  factory: () => {
    return [
      {
        type: FIELD_TYPE.input,
        label: DASHBOARD_LABELS.columns.code,
        inputType: 'text',
        name: 'code',
        validations: [
          Validators.required,
          Validators.maxLength(60)
        ]
      },
      /*{
          type: FIELD_TYPE.autocomplete,
          label: DASHBOARD_LABELS.columns.type,
          inputType: 'text',
          name: 'typeId',
          displayedValue: 'name',
          options$: inject(StoreService).getClassItem(),
          validations: [
              Validators.required,
              Validators.maxLength(60),
              ValidateStoreEntity
          ]
      },*/
      {
        type: FIELD_TYPE.input,
        label: DASHBOARD_LABELS.columns.address,
        inputType: 'text',
        name: 'address',
        validations: [
          Validators.required
        ]
      }
    ];
  }
});
