import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DASHBOARD_LABELS, FORM, TABLE_COLUMNS } from 'src/app/pages/dashboard/dashboard.constants';
import { FieldConfig } from 'src/app/components/generic-form/models/field-config.interface';
import { MatTableDataSource } from '@angular/material/table';
import { IItem } from 'src/app/models/item.model';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ItemsService } from 'src/app/services/items.service';
import { NotificationService } from 'src/app/services/notification.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { ManagingDialogComponent } from 'src/app/components/managing-dialog/managing-dialog.component';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public labels = DASHBOARD_LABELS;
  public displayedColumns: string[] = TABLE_COLUMNS;
  public list: MatTableDataSource<IItem>;
  public inUse: boolean;
  private formConfig: FieldConfig[];
  private destroyer: Subject<void> = new Subject<void>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: ItemsService,
    private notification: NotificationService,
    @Inject(FORM) truckForm) {
    this.formConfig = truckForm;
  }

  ngOnInit(): void {
    this.updateList();
  }

  onNewClick(): void {
    this.dialog.open(ManagingDialogComponent, {
      data: {
        labels: {
          dialogTitle: this.labels.diaologAddTitle,
          cancelButtonText: this.labels.cancelButtonText,
          submitButtonText: this.labels.submitButtonText
        },
        fields: this.formConfig,
        submit: (formData) => {
          this.inUse = true;
          return this.service.createItem(formData);
        }
      },
      autoFocus: false,
      disableClose: true
    }).afterClosed()
      .pipe(
        finalize(() => this.inUse = false),
        takeUntil(this.destroyer)
      ).subscribe(
      res => {
        if (res) {
          this.notification.success(DASHBOARD_LABELS.successCreate);
          this.updateList();
        }
      },
      err => {
        if (err) {
          this.notification.error(err.message);
        }
      });
  }

  onEditClick(truck: IItem): void {
    const trck = {
      ...truck,
      typeId: {
        id: truck.typeId,
        name: truck.type
      }
    };
    this.dialog.open(ManagingDialogComponent, {
      data: {
        labels: {
          dialogTitle: this.labels.diaologEditTitle,
          cancelButtonText: this.labels.cancelButtonText,
          submitButtonText: this.labels.submitButtonText
        },
        fields: this.formConfig,
        item: trck,
        submit: (formData) => {
          this.inUse = true;
          return this.service.editItem(formData);
        }
      },
      autoFocus: false,
      disableClose: true
    }).afterClosed()
      .pipe(
        finalize(() => this.inUse = false),
        takeUntil(this.destroyer)
      ).subscribe(
      (res) => {
        if (res) {
          this.notification.success(DASHBOARD_LABELS.successUpdate);
          this.updateList();
        }
      },
      err => {
        if (err) {
          this.notification.error(err.message);
        }
      }
    );
  }

  onDeleteClick(): void {
    this.dialog.open(ConfirmationComponent, {
      data: {message: DASHBOARD_LABELS.confirmDelete},
      autoFocus: false,
    }).afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.deleteItem();
    });
  }

  onRefresh(): void {
    this.updateList();
  }

  onSelectItem(item, event): void {
    item.selected = event.checked;
  }

  isButtonDisabled(): boolean {
    if (!this.list || !this.list.filteredData) {
      return false;
    }
    const selected = this.list.filteredData.filter(item => item.selected);
    return !selected.length;
  }

  ngOnDestroy(): void {
    this.destroyer.next();
    this.destroyer.complete();
  }

  private updateList(): void {
    this.inUse = true;

    this.service.getItemsList()
      .pipe(
        finalize(() => this.inUse = false),
        takeUntil(this.destroyer)
      ).subscribe(
      list => {
        this.list = new MatTableDataSource(list);
        this.list.sort = this.sort;
      },
      err => {
        if (err) {
          this.notification.error(err.message);
        }
      });
  }


  private deleteItem(): void {
    const selected = this.list.filteredData.filter(i => {
      return i.selected;
    });
    this.inUse = true;
    this.service.deleteItem(selected)
      .pipe(
        finalize(() => {
          this.inUse = false;
          this.updateList();
        }),
        takeUntil(this.destroyer)
      )
      .subscribe(
        () => {
          this.notification.success(DASHBOARD_LABELS.successDelete);
        },
        err => {
          if (err) {
            this.notification.warn(`${DASHBOARD_LABELS.processError} ${err.message}`);
          }
        }
      );
  }

  onShareClick(): void {
    this.notification.info('Not implemented yet')
  }
}
