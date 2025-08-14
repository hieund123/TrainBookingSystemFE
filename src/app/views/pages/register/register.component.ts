import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiResponse, AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { passwordStrengthValidator } from '../../../validators/password-strength.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class RegisterComponent implements OnInit {
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, passwordStrengthValidator()]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const p = group.get('password')?.value;
    const cp = group.get('confirmPassword')?.value;
    return p && cp && p !== cp ? { passwordMismatch: true } : null;
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const dto = {
      username: this.f['username'].value!,
      email: this.f['email'].value!,
      password: this.f['password'].value!,
    };

    const role = 'PASSENGER';

    this.auth.register(dto, role).subscribe({
      next: (res: any) => {
        console.log('API trả về:', res);
        this.loading = false;

        const status = res?.Status || res?.status;
        const message = res?.Message || res?.message;

        if (status === 'Success') {
          this.successMessage = message || 'Đăng ký thành công';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000); // Chuyển hướng sau 2 giây
        } else {
          this.errorMessage = message || 'Có lỗi xảy ra';
        }
      },
      error: (err) => {
        this.loading = false;
        // Nếu API trả về lỗi dạng có Message
        const message = err?.error?.Message || err?.error?.message;
        this.errorMessage = message || 'Đã xảy ra lỗi, vui lòng thử lại.';
      },
    });
  }
}
