import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ApiService } from 'src/app/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('AuthService', () => {
  let service: AuthService;
  let fakeApiService = jasmine.createSpyObj(['post'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule],
      providers: [
        {provide: ApiService, useValue: fakeApiService}
      ]
    });
    service = TestBed.inject(AuthService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('post() method should be called', () => {
    service.signIn('arweaa@gmail.com', '2ee3wqwHGD');
    expect(fakeApiService.post).toHaveBeenCalled();
  })
});
