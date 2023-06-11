import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {
  constructor(private signupService: SignupService) {}

  public savedUser$ = this.signupService.savedUser$;
  public loading$ = this.signupService.loading$;
}
