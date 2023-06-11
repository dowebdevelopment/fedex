import { TestBed } from '@angular/core/testing';

import { SignupService } from './signup.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import {
  mockUserAPI,
  mockUserFormValid,
  mockUserSaved,
} from '../utils/user.utils.spec';

describe('SignupService', () => {
  let service: SignupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignupService],
    });
    service = TestBed.inject(SignupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<UserSaved>', () => {
    service.signupUser(mockUserFormValid).subscribe(result => {
      expect(result).toEqual(mockUserSaved);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUserAPI);
  });

  it('should handle errors when posting to the server', () => {
    service.signupUser(mockUserFormValid).subscribe({
      error: error => expect(error).toBeTruthy(),
    });

    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush('Error', { status: 400, statusText: 'Bad Request' });
  });
});
