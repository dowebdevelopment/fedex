import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupService } from 'src/app/services/signup.service';
import { UserForm, UserSaved } from 'src/app/types/user.types';
import { namelessPasswordValidator } from 'src/app/validators/nameless-password.validator';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent {
  @ViewChild('dialogErrorTemplate')
  public dialogErrorTemplate!: TemplateRef<HTMLElement>;
  public signupForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])/),
        this.noNameValidator()
      ],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private dialog: MatDialog
  ) {}

  public get firstName() {
    return this.signupForm.get('firstName') as FormControl<string>;
  }

  public get lastName() {
    return this.signupForm.get('lastName') as FormControl<string>;
  }

  public get email() {
    return this.signupForm.get('email') as FormControl<string>;
  }

  public get password() {
    return this.signupForm.get('password') as FormControl<string>;
  }

  public submitForm() {
    if (this.signupForm.invalid) {
      return;
    }

    const user: UserForm = this.signupForm.getRawValue();
    this.signupService.signupUser(user).subscribe({
      next: this.handleSavedUser.bind(this),
      error: this.handleError.bind(this),
    });
  }

  public openErrorDialog(): void {
    this.dialog.open(this.dialogErrorTemplate, {
      width: '250px',
    });
  }

  public handleSavedUser(user: UserSaved) {
    this.signupService.savedUser$.next(user);
  }

  public handleError() {
    this.openErrorDialog();
  }

  private noNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { firstName, lastName } = this.signupForm?.getRawValue() || {};
      return namelessPasswordValidator(firstName, lastName)(control);
    };
  }
}
