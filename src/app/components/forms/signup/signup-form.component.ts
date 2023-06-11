import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupService } from 'src/app/services/signup.service';
import { UserForm, UserSaved } from 'src/app/types/user.types';

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
    firstName: ['Dennis', Validators.required],
    lastName: ['Otten', Validators.required],
    email: ['test@test.nl', [Validators.required, Validators.email]],
    password: [
      'testTEST!',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])/),
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

  private openErrorDialog(): void {
    this.dialog.open(this.dialogErrorTemplate, {
      width: '250px',
    });
  }

  private handleSavedUser(user: UserSaved) {
    this.signupService.savedUser$.next(user);
  }

  private handleError() {
    this.openErrorDialog();
  }
}
