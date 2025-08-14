import { Component, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
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
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AuthService,
  LoginDto,
  OtpResponse,
} from '../../../services/auth.service';
import { Router } from '@angular/router';
import { BookingService } from '../../../features/booking/services/booking.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showOtpInput = false;
  emailForOtp = '';
  message = '';
  isOtpSent = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      code: [''],
    });
  }

  // sendOtp() {
  //   if (
  //     !this.loginForm.get('email')?.valid ||
  //     !this.loginForm.get('password')?.valid
  //   ) {
  //     this.message = 'Vui lòng nhập email và mật khẩu hợp lệ.';
  //     return;
  //   }

  //   this.authService
  //     .requestOtp({
  //       email: this.loginForm.value.email,
  //       password: this.loginForm.value.password,
  //     })
  //     .subscribe({
  //       next: () => {
  //         this.isOtpSent = true;
  //         this.loginForm.patchValue({ code: '' });
  //         this.message = 'OTP đã được gửi!';
  //       },
  //       error: (err) => {
  //         this.message = err.error?.message || 'Sai email hoặc mật khẩu.';
  //       },
  //     });
  // }

  onLogin() {
    if (!this.loginForm.valid) {
      this.message = 'Vui lòng nhập đầy đủ thông tin hợp lệ.';
      return;
    }

    this.isLoading = true;
    this.message = '';

    const loginDto: LoginDto = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(loginDto).subscribe({
      next: (response) => {
        this.isLoading = false;

        const status = (response as any).Status || (response as any).status;
        const token = (response as any).Token || (response as any).token;

        if (status === 'Success' && token) {
          console.log('Token:', token);
          localStorage.setItem('token', token);
          this.message = 'Đăng nhập thành công!';

          // Kiểm tra booking chưa hoàn thành
          const pendingBooking = localStorage.getItem('pendingBooking');
          if (pendingBooking) {
            const booking = JSON.parse(pendingBooking);

            // Chuyển về trang booking tương ứng với scheduleId (TrainJourneyId)
            const scheduleId = booking.TrainJourneyId;
            this.router.navigate([`/booking/${scheduleId}`]);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login error:', err);

        this.message =
          err.status === 401
            ? 'Email hoặc mật khẩu không đúng.'
            : err.error?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
      },
    });
  }
}
