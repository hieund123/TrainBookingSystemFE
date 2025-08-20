import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  token?: string;
}

export interface Login2FADto {
  email: string;
  code: string;
}

export interface OtpResponse {
  status: string;
  message: string;
}

export interface ApiResponse {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7117/api/Auth';

  constructor(private http: HttpClient) {}

  register(dto: RegisterUserDto, role = 'PASSENGER'): Observable<ApiResponse> {
    const params = new HttpParams().set('role', role);
    return this.http.post<ApiResponse>(`${this.baseUrl}/register`, dto, {
      params,
    });
  }

  //   requestOtp(loginDto: LoginDto): Observable<OtpResponse> {
  //     return this.http.post<OtpResponse>(`${this.baseUrl}/login`, loginDto);
  //   }

  // loginWithOtp(
  //   dto: Login2FADto
  // ): Observable<{ token: string; expiration: string }> {
  //   return this.http.post<{ token: string; expiration: string }>(
  //     `${this.baseUrl}/login-2fa`,
  //     {
  //       email: dto.email,
  //       code: dto.code
  //     }
  //   );
  // }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginDto);
  }

  // ✅ Lấy token từ localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Giải mã token để lấy role
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return (
        decoded['role'] ||
        decoded[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] ||
        null
      );
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  // ✅ Kiểm tra đăng nhập
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ✅ Đăng xuất
  logout(): void {
    localStorage.removeItem('token');
  }
}
