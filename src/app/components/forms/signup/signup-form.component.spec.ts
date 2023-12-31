import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupFormComponent } from './signup-form.component';
import { SignupService } from 'src/app/services/signup.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import {
  mockUserFormInvalid,
  mockUserFormValid,
  mockUserSaved,
} from 'src/app/utils/user.utils.spec';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let mockSignupService: jasmine.SpyObj<SignupService>;

  beforeEach(async () => {
    mockSignupService = jasmine.createSpyObj('SignupService', ['signupUser']);

    await TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
      providers: [
        { provide: SignupService, useValue: mockSignupService },
        { provide: MatDialog, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the form is valid', () => {
    beforeEach(() => {
      spyOn(component, 'handleSavedUser');
      spyOn(component, 'handleError');
      component.signupForm.setValue(mockUserFormValid);
    });

    it('should call the signup service with the correct data', () => {
      mockSignupService.signupUser.and.returnValue(of(mockUserSaved));
      component.signupForm.setValue(mockUserFormValid);
      component.submitForm();
      expect(mockSignupService.signupUser).toHaveBeenCalledWith(
        mockUserFormValid
      );
      expect(component.handleSavedUser).toHaveBeenCalled();
    });

    it('should call handleError on unsuccessful signup', () => {
      const errorMessage = 'Error signing up';
      mockSignupService.signupUser.and.returnValue(
        throwError(() => new Error(errorMessage))
      );
      component.submitForm();
      expect(component.handleError).toHaveBeenCalled();
    });
  });

  describe('when the form is invalid', () => {
    beforeEach(() => {
      spyOn(component, 'handleSavedUser');
      spyOn(component, 'handleError');
      component.signupForm.setValue(mockUserFormInvalid);
    });

    it('should not call the signup service', () => {
      component.submitForm();
      expect(mockSignupService.signupUser).not.toHaveBeenCalled();
    });
  });
});
