import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagingDialogComponent } from './managing-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';

describe('ManagingDialogComponent', () => {
  let component: ManagingDialogComponent;
  let fixture: ComponentFixture<ManagingDialogComponent>;
  let fakeNotificationService = jasmine.createSpyObj(['error'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: NotificationService,
          useValue: fakeNotificationService
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
      declarations: [ManagingDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagingDialogComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
