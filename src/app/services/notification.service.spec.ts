import { NotificationService } from 'src/app/services/notification.service';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('NotificationService', () => {

  let snackBar: MatSnackBar;
  let service: NotificationService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        NotificationService,
      ],
    });
    snackBar = TestBed.inject(MatSnackBar);
    service = TestBed.inject(NotificationService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('error function should open shack bar', () => {
    const spy = spyOn(snackBar, 'open');
    service.error('Hello, I am error');
    expect(spy).toHaveBeenCalled();
  })

});
