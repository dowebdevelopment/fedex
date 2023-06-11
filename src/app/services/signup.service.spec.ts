import { TestBed } from '@angular/core/testing';

import { SignupService } from './signup.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAPI, UserForm, UserSaved } from '../types/user.types';
import { environment } from 'src/environments/environment';


const mockUserForm: UserForm = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  password: 'password'
};

const mockUserAPI: UserAPI = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
}

const mockUserSaved: UserSaved = {
  id: '1',
  name: 'John Doe'
}

describe('SignupService', () => {
  let service: SignupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignupService]
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
    service.signupUser(mockUserForm).subscribe(
      (result) => {
        expect(result).toEqual(mockUserSaved);
      }
    );
    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUserAPI);
  });

  it('should handle errors when posting to the server', () => {
    service.signupUser(mockUserForm).subscribe({
      error: (error) => expect(error).toBeTruthy(),
      next: () => {}
    });

    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush('Error', { status: 400, statusText: 'Bad Request' });
  });
});
