import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidatorErrorMessageComponent } from '../shared/components/validator-error-message/validator-error-message.component';
import { ValidatorErrorMessagePipe } from '../shared/pipes/validator-error-message.pipe';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '../core/constants/localstorage-keys';
import { LocalstorageService } from '../core/services/localstorage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ValidatorErrorMessageComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public showPassword = false;
  private authService = inject(AuthService);
  private localStorageService = inject(LocalstorageService);
  private router = inject(Router);

  public loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    const username = this.loginForm.value.username;

    if (!username) return;
    this.authService
      .login()
      .pipe()
      .subscribe((res) => {
        if (res.state) {
          this.localStorageService.setItem(LocalStorageKeys.TOKEN, res.token);
          this.localStorageService.setItem(LocalStorageKeys.USERNAME, username);
        }
        this.router.navigateByUrl('');
      });
  }
}
